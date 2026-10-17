import Checkout from '../modules/checkout';
import Cadastro from '../modules/cadastro';
import Login from '../modules/login';

describe('Funcionalidade: Processo de Checkout e Pedido', () => {

  beforeEach(() => {
    cy.visit('/');
  });

  it('Caso 15: Fazer pedido: Registre-se antes de finalizar a compra', () => {
    const emailCheckout = `checkout_registo_${Date.now()}@gmail.com`;

    Cadastro.preencherCadastroInicial('Utilizador Checkout', emailCheckout);
    Cadastro.preencherFormularioCompleto({
      senha: 'SenhaSegura123',
      dia: '10',
      mes: 'June',
      ano: '1992',
      primeiroNome: 'Utilizador',
      sobrenome: 'Checkout',
      empresa: 'Empresa Teste',
      endereco: 'Rua das Compras, 100',
      pais: 'United States',
      estado: 'Florida',
      cidade: 'Miami',
      cep: '33101',
      telemovel: '11966665555'
    });
    cy.get('[data-qa="continue-button"]').click({ force: true });
    cy.contains('Logged in as Utilizador Checkout').should('be.visible');

    Checkout.adicionarPrimeiroProdutoAoCarrinho();
    Checkout.prosseguirParaCheckout();

    cy.contains('Address Details').should('be.visible');
    cy.contains('Review Your Order').should('be.visible');
    Checkout.preencherDadosPagamento('Utilizador Checkout', '4111111111111111', '123', '12', '2028');

    cy.contains(/ORDER PLACED!/i).should('be.visible');
    Checkout.deletarConta();
  });

  it('Caso 16: Fazer pedido: Faça login antes de finalizar a compra', () => {
    const emailLoginCheckout = `checkout_login_${Date.now()}@gmail.com`;
    const senha = 'SenhaSegura123';

    // 1. Regista o utilizador
    Cadastro.preencherCadastroInicial('Utilizador LoginCheckout', emailLoginCheckout);
    Cadastro.preencherFormularioCompleto({
      senha: senha,
      dia: '15',
      mes: 'July',
      ano: '1994',
      primeiroNome: 'Utilizador',
      sobrenome: 'LoginCheckout',
      empresa: 'Empresa Teste',
      endereco: 'Rua do Login, 200',
      pais: 'United States',
      estado: 'Texas',
      cidade: 'Houston',
      cep: '77001',
      telemovel: '11955554444'
    });
    cy.get('[data-qa="continue-button"]').click({ force: true });

    // 2. Faz logout
    Login.fazerLogout();

    // 3. Efetua login com force para evitar interceções do browser
    Login.preencherLogin(emailLoginCheckout, senha);
    cy.contains('Logged in as Utilizador LoginCheckout').should('be.visible');

    // 4. Adiciona produto e realiza checkout
    Checkout.adicionarPrimeiroProdutoAoCarrinho();
    Checkout.prosseguirParaCheckout();

    cy.contains('Address Details').should('be.visible');
    Checkout.preencherDadosPagamento('Utilizador LoginCheckout', '4111111111111111', '321', '10', '2029');

    // 5. Confirma pedido e remove a conta
    cy.contains(/ORDER PLACED!/i).should('be.visible');
    Checkout.deletarConta();
  });

});