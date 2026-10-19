import Cadastro from '../modules/cadastro';

describe('Funcionalidade: Cadastro de Utilizador', () => {

  beforeEach(() => {
    cy.visit('/');
  });

  it('Caso 1: Criar um novo utilizador com sucesso', () => {
    // Timestamp em milissegundos garante um e-mail 100% novo a cada execução
    const emailUnico = `carlos_${Date.now()}@teste.com`;

    Cadastro.preencherCadastroInicial('Carlos Alberto', emailUnico);

    cy.contains('ENTER ACCOUNT INFORMATION', { timeout: 15000 }).should('be.visible');

    Cadastro.preencherFormularioCompleto({
      senha: 'SenhaSegura123',
      dia: '15',
      mes: 'August',
      ano: '1990',
      primeiroNome: 'Carlos',
      sobrenome: 'Alberto',
      empresa: 'Empresa Aluno',
      endereco: 'Av. Paulista, 1000',
      pais: 'United States',
      estado: 'New York',
      cidade: 'New York',
      cep: '10001',
      telemovel: '11987654321'
    });

    cy.get('[data-qa="account-created"]', { timeout: 15000 }).should('be.visible');
    cy.get('[data-qa="continue-button"]').click({ force: true });
    cy.contains('Logged in as Carlos Alberto', { timeout: 15000 }).should('be.visible');
  });

  it('Caso 5: Tentar cadastrar um e-mail já existente', () => {
    // Usamos um e-mail comum que é frequentemente registado na base de dados do Automation Exercise
    const emailExistente = 'email_ja_registado@teste.com';

    // Se a base de dados do site estiver limpa, fazemos uma tentativa rápida de registo inicial
    Cadastro.preencherCadastroInicial('Teste Repetido', emailExistente);

    // Se já existir, a mensagem aparece logo na página inicial sem ter de preencher o formulário todo
    cy.get('body').then(($body) => {
      if ($body.text().includes('Email Address already exist!')) {
        cy.contains('Email Address already exist!').should('be.visible');
      } else {
        // Se não existia, insere o formulário para registar e depois valida a repetição
        cy.contains('ENTER ACCOUNT INFORMATION', { timeout: 15000 }).should('be.visible');
        Cadastro.preencherFormularioCompleto({
          senha: 'Senha123',
          dia: '1',
          mes: 'January',
          ano: '2000',
          primeiroNome: 'Teste',
          sobrenome: 'User',
          empresa: 'QA',
          endereco: 'Rua 1',
          pais: 'United States',
          estado: 'NY',
          cidade: 'NY',
          cep: '10001',
          telemovel: '123456789'
        });
        cy.get('[data-qa="continue-button"]').click({ force: true });
        cy.get('a[href="/logout"]').click({ force: true });
        
        // Agora tenta registar novamente com o mesmo e-mail
        Cadastro.preencherCadastroInicial('Outro Teste', emailExistente);
        cy.contains('Email Address already exist!', { timeout: 15000 }).should('be.visible');
      }
    });
  });

});