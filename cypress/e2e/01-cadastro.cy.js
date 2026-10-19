import Cadastro from '../modules/cadastro';

describe('Funcionalidade: Cadastro de Utilizador', () => {

  beforeEach(() => {
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
    cy.get('[data-qa="continue-button"]').click({ force: true });
    cy.contains('Logged in as Carlos Alberto', { timeout: 10000 }).should('be.visible');
  });

  it('Caso 5: Tentar cadastrar um e-mail já existente', () => {
    const emailExistente = `duplicado_${Date.now()}@gmail.com`;

    // 1. Regista o utilizador pela primeira vez para o e-mail passar a existir no sistema
    Cadastro.preencherCadastroInicial('Utilizador Base', emailExistente);
    cy.contains('ENTER ACCOUNT INFORMATION', { timeout: 10000 }).should('be.visible');
    
    Cadastro.preencherFormularioCompleto({
      senha: 'Senha123',
      dia: '10',
      mes: 'May',
      ano: '1995',
      primeiroNome: 'Utilizador',
      sobrenome: 'Base',
      empresa: 'Teste',
      endereco: 'Rua B',
      pais: 'Canada',
      estado: 'Ontario',
      cidade: 'Toronto',
      cep: 'M5V2H1',
      telemovel: '123456789'
    });
    cy.get('[data-qa="continue-button"]').click({ force: true });
    
    // 2. Faz logout para voltar à página de login/registo
    cy.get('a[href="/logout"]', { timeout: 10000 }).click();
    cy.url().should('include', '/login');

    // 3. Tenta registar novamente com EXATAMENTE o mesmo e-mail para testar a restrição
    Cadastro.preencherCadastroInicial('Outro Nome', emailExistente);
    
    // Valida a mensagem de erro esperada
    cy.contains('Email Address already exist!', { timeout: 10000 }).should('be.visible');
  });

});