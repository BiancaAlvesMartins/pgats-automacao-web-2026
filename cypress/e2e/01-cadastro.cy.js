import Cadastro from '../modules/cadastro';

describe('Funcionalidade: Cadastro de Utilizador', () => {

  beforeEach(() => {
    cy.visit('/');
  });

  it('Caso 1: Criar um novo utilizador com sucesso', () => {
    const emailPersonalizado = `carlos.alberto_${Date.now()}@gmail.com`;

    Cadastro.preencherCadastroInicial('Carlos Alberto', emailPersonalizado);

    cy.contains('ENTER ACCOUNT INFORMATION').should('be.visible');

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

    cy.get('[data-qa="account-created"]').should('be.visible');
    cy.get('[data-qa="continue-button"]').click();
    cy.contains('Logged in as Carlos Alberto').should('be.visible');
  });

  it('Caso 5: Tentar cadastrar um e-mail já existente', () => {
    // Podes mudar este e-mail para o que quiseres que o professor veja
    const emailFixoExistente = 'aluno.repetido@gmail.com';

    Cadastro.preencherCadastroInicial('Aluno Teste', emailFixoExistente);
    cy.visit('/');

    Cadastro.preencherCadastroInicial('Outro Aluno', emailFixoExistente);
    cy.contains('Email Address already exist!').should('be.visible');
  });

});