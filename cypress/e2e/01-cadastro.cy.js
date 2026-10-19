import Cadastro from '../modules/cadastro';

describe('Funcionalidade: Cadastro de Utilizador', () => {

  beforeEach(() => {
    // 1. Bloqueia os domínios de anúncios que causam interrupções na CI
    cy.intercept('GET', '**/pagead/**', { statusCode: 200, body: {} });
    cy.intercept('GET', '**/gampad/**', { statusCode: 200, body: {} });
    cy.intercept('GET', '**/google-analytics.com/**', { statusCode: 200, body: {} });

    // 2. Ignora exceções não tratadas da própria página
    Cypress.on('uncaught:exception', () => false);

    cy.visit('/');
  });

  it('Caso 1: Criar um novo utilizador com sucesso', () => {
    const emailUnico = `carlos_${Date.now()}@teste.com`;

    Cadastro.preencherCadastroInicial('Carlos Alberto', emailUnico);

    // Valida que o formulário carregou
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

    cy.get('[data-qa="account-created"]', { timeout: 20000 }).should('be.visible');
    cy.get('[data-qa="continue-button"]').click({ force: true });
    cy.contains('Logged in as Carlos Alberto', { timeout: 20000 }).should('be.visible');
  });

  it('Caso 5: Tentar cadastrar um e-mail já existente', () => {
    // Utiliza o e-mail do utilizador pré-existente no ambiente
    const emailExistente = 'carlos.alberto@gmail.com';

    Cadastro.preencherCadastroInicial('Outro Carlos', emailExistente);

    // Se o e-mail já existe, a mensagem é apresentada imediatamente sem necessidade de preencher o formulário
    cy.contains('Email Address already exist!', { timeout: 20000 }).should('be.visible');
  });

});