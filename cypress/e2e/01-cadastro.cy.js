import Cadastro from '../modules/cadastro';

describe('Funcionalidade: Cadastro de Utilizador', () => {

  beforeEach(() => {
    // Tratamento simples para o Cypress nao parar em erros dinamicos da pagina
    Cypress.on('uncaught:exception', () => false);
    cy.visit('/');
  });

  it('Caso 1: Criar um novo utilizador com sucesso', () => {
    const emailPersonalizado = `carlos.alberto_${Date.now()}@gmail.com`;

    Cadastro.preencherCadastroInicial('Carlos Alberto', emailPersonalizado);

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
    cy.get('[data-qa="continue-button"]').click();
    cy.contains('Logged in as Carlos Alberto', { timeout: 10000 }).should('be.visible');
  });

  it('Caso 5: Tentar cadastrar um e-mail já existente', () => {
    // Email padrao para validacao de cadastro existente
    const emailExistente = 'carlos.alberto@gmail.com';

    Cadastro.preencherCadastroInicial('Carlos Alberto', emailExistente);
    cy.contains('Email Address already exist!', { timeout: 10000 }).should('be.visible');
  });

});