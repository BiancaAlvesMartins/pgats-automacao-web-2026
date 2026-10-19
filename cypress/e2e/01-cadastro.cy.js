import Cadastro from '../modules/cadastro';

describe('Funcionalidade: Cadastro de Utilizador', () => {

  beforeEach(() => {
    // Evita falhas por erros de scripts de terceiros/anúncios
    Cypress.on('uncaught:exception', () => false);

    // Bloqueia chamadas de anúncios que travam o formulário
    cy.intercept('GET', '**/pagead/**', { statusCode: 200, body: {} });
    cy.intercept('GET', '**/gampad/**', { statusCode: 200, body: {} });

    cy.visit('/login');
  });

  it('Caso 1: Criar um novo utilizador com sucesso', () => {
    const emailUnico = `carlos_${Date.now()}@teste.com`;

    // 1. Inicia o cadastro na página de login/cadastro
    cy.get('[data-qa="signup-name"]').type('Carlos Alberto');
    cy.get('[data-qa="signup-email"]').type(emailUnico);
    cy.get('[data-qa="signup-button"]').click({ force: true });

    // 2. Aguarda o formulário carregar
    cy.contains('ENTER ACCOUNT INFORMATION', { timeout: 15000 }).should('be.visible');

    // 3. Preenche o formulário diretamente garantindo force: true nos campos chave
    cy.get('#id_gender1').check({ force: true });
    cy.get('[data-qa="password"]').type('SenhaSegura123');
    cy.get('[data-qa="days"]').select('15', { force: true });
    cy.get('[data-qa="months"]').select('August', { force: true });
    cy.get('[data-qa="years"]').select('1990', { force: true });

    cy.get('[data-qa="first_name"]').type('Carlos');
    cy.get('[data-qa="last_name"]').type('Alberto');
    cy.get('[data-qa="company"]').type('Empresa Aluno');
    cy.get('[data-qa="address"]').type('Av. Paulista, 1000');
    cy.get('[data-qa="country"]').select('United States', { force: true });
    cy.get('[data-qa="state"]').type('New York');
    cy.get('[data-qa="city"]').type('New York');
    cy.get('[data-qa="zipcode"]').type('10001');
    cy.get('[data-qa="mobile_number"]').type('11987654321');

    // 4. Submete a criação da conta
    cy.get('[data-qa="create-account"]').click({ force: true });

    // 5. Validações finais
    cy.get('[data-qa="account-created"]', { timeout: 15000 }).should('be.visible');
    cy.get('[data-qa="continue-button"]').click({ force: true });
    cy.contains('Logged in as Carlos Alberto', { timeout: 15000 }).should('be.visible');
  });

  it('Caso 5: Tentar cadastrar um e-mail já existente', () => {
    // Usa o e-mail cadastrado no teste anterior de login para garantir que ele já existe
    const emailExistente = 'carlos.alberto@gmail.com';

    cy.get('[data-qa="signup-name"]').type('Carlos Alberto');
    cy.get('[data-qa="signup-email"]').type(emailExistente);
    cy.get('[data-qa="signup-button"]').click({ force: true });

    // Valida imediatamente a mensagem de erro
    cy.contains('Email Address already exist!', { timeout: 15000 }).should('be.visible');
  });

});