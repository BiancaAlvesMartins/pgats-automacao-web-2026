import Cadastro from '../modules/cadastro';

describe('Funcionalidade: Cadastro de Utilizador', () => {

  beforeEach(() => {
    cy.visit('/');
  });

  it('Caso 1: Criar um novo utilizador com sucesso', () => {
    const emailPersonalizado = `carlos.alberto_${Date.now()}@gmail.com`;

    Cadastro.preencherCadastroInicial('Carlos Alberto', emailPersonalizado);

    // Garante que a página seguinte carregou com tempo de espera adequado
    cy.contains('ENTER ACCOUNT INFORMATION', { timeout: 10000 }).should('be.visible');

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

    cy.get('[data-qa="account-created"]', { timeout: 10000 }).should('be.visible');
    
    // O { force: true } evita que falhe caso apareça algum anúncio por cima do botão na CI
    cy.get('[data-qa="continue-button"]').click({ force: true });
    
    cy.contains('Logged in as Carlos Alberto', { timeout: 10000 }).should('be.visible');
  });

  it('Caso 5: Tentar cadastrar um e-mail já existente', () => {
    // Usamos um e-mail estático que já sabemos que existe ou criamos um fluxo seguro
    const emailFixoExistente = 'aluno.repetido.teste@gmail.com';

    // Primeiro registamos o utilizador por completo para garantir que o e-mail fica ocupado na base de dados
    Cadastro.preencherCadastroInicial('Aluno Base', emailFixoExistente);
    cy.contains('ENTER ACCOUNT INFORMATION').should('be.visible');
    
    Cadastro.preencherFormularioCompleto({
      senha: 'Senha123',
      dia: '10',
      mes: 'May',
      ano: '1995',
      primeiroNome: 'Aluno',
      sobrenome: 'Base',
      empresa: 'Teste',
      endereco: 'Rua A',
      pais: 'Canada',
      estado: 'Ontario',
      cidade: 'Toronto',
      cep: 'M5V2H1',
      telemovel: '123456789'
    });
    cy.get('[data-qa="continue-button"]').click({ force: true });
    
    // Faz logout para voltar à página inicial
    cy.get('a[href="/logout"]').click();

    // Agora tentamos registar novamente com o mesmo e-mail para validar a mensagem de erro
    Cadastro.preencherCadastroInicial('Outro Aluno', emailFixoExistente);
    cy.contains('Email Address already exist!', { timeout: 10000 }).should('be.visible');
  });

});