import Cadastro from '../modules/cadastro';

describe('Funcionalidade: Cadastro de Utilizador', () => {

  beforeEach(() => {
    // Ignora erros não tratados da página (como scripts de anúncios a falhar)
    Cypress.on('uncaught:exception', () => false);
    cy.visit('/');
  });

  it('Caso 1: Criar um novo utilizador com sucesso', () => {
    // Garante um e-mail único a cada execução
    const emailUnico = `carlos_${Date.now()}@teste.com`;

    Cadastro.preencherCadastroInicial('Carlos Alberto', emailUnico);

    // Espera explicitamente que o cabeçalho do formulário apareça
    cy.contains('ENTER ACCOUNT INFORMATION', { timeout: 20000 }).should('be.visible');

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

    // Confirma criação de conta e força o clique para ignorar anúncios por cima do botão
    cy.get('[data-qa="account-created"]', { timeout: 20000 }).should('be.visible');
    cy.get('[data-qa="continue-button"]').click({ force: true });
    cy.contains('Logged in as Carlos Alberto', { timeout: 20000 }).should('be.visible');
  });

  it('Caso 5: Tentar cadastrar um e-mail já existente', () => {
    // E-mail fixo padrão para testar a validação de e-mail repetido
    const emailExistente = 'email.ja.existente@teste.com';

    // Tentativa 1: Garante que o e-mail fica criado no sistema
    Cadastro.preencherCadastroInicial('Utilizador Um', emailExistente);
    
    cy.get('body', { timeout: 20000 }).then(($body) => {
      // Se a mensagem de erro já aparecer de execuções anteriores, valida logo
      if ($body.text().includes('Email Address already exist!')) {
        cy.contains('Email Address already exist!').should('be.visible');
      } else {
        // Caso a base de dados do site esteja limpa, regista-o uma vez primeiro
        cy.contains('ENTER ACCOUNT INFORMATION', { timeout: 20000 }).should('be.visible');
        Cadastro.preencherFormularioCompleto({
          senha: 'Senha123',
          dia: '1',
          mes: 'January',
          ano: '1995',
          primeiroNome: 'Utilizador',
          sobrenome: 'Um',
          empresa: 'Empresa',
          endereco: 'Rua Um, 100',
          pais: 'United States',
          estado: 'New York',
          cidade: 'New York',
          cep: '10001',
          telemovel: '11999999999'
        });
        cy.get('[data-qa="continue-button"]').click({ force: true });
        
        // Volta à página inicial/login
        cy.visit('/login');
        
        // Tentativa 2: Tenta registar novamente com o mesmo e-mail para capturar a validação
        Cadastro.preencherCadastroInicial('Utilizador Dois', emailExistente);
        cy.contains('Email Address already exist!', { timeout: 20000 }).should('be.visible');
      }
    });
  });

});