import Login from '../modules/login';
import Cadastro from '../modules/cadastro';

describe('Funcionalidade: Login e Logout de Utilizador', () => {
  const emailValido = `utilizador_login_${Date.now()}@gmail.com`;
  const senhaValida = 'SenhaSegura123';

  // Antes de testar o login, garantimos que existe uma conta válida criada
  before(() => {
    cy.visit('/');
    Cadastro.preencherCadastroInicial('Utilizador Valido', emailValido);
    Cadastro.preencherFormularioCompleto({
      senha: senhaValida,
      dia: '20',
      mes: 'January',
      ano: '1998',
      primeiroNome: 'Utilizador',
      sobrenome: 'Valido',
      empresa: 'Empresa Teste',
      endereco: 'Rua Principal, 456',
      pais: 'United States',
      estado: 'California',
      cidade: 'Los Angeles',
      cep: '90001',
      telemovel: '11977776666'
    });
    cy.get('[data-qa="continue-button"]').click();
    Login.fazerLogout();
  });

  beforeEach(() => {
    cy.visit('/');
  });

  it('Caso 2: Login do usuário com e-mail e senha corretos', () => {
    Login.preencherLogin(emailValido, senhaValida);
    cy.contains('Logged in as Utilizador Valido').should('be.visible');
  });

  it('Caso 3: Login do usuário com e-mail e senha incorretos', () => {
    Login.preencherLogin(emailValido, 'SenhaIncorreta999');
    cy.contains('Your email or password is incorrect!').should('be.visible');
  });

  it('Caso 4: Fazer logout do usuário', () => {
    Login.preencherLogin(emailValido, senhaValida);
    cy.contains('Logged in as Utilizador Valido').should('be.visible');
    
    Login.fazerLogout();
    cy.contains('Login to your account').should('be.visible');
  });

});