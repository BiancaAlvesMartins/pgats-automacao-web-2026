import Produtos from '../modules/produtos';

describe('Funcionalidade: Catálogo de Produtos e Subscrição', () => {

  beforeEach(() => {
    cy.visit('/');
  });

  it('Caso 8: Verificar todos os produtos e a página de detalhes do produto', () => {
    Produtos.acessarPaginaProdutos();
    cy.contains(/ALL PRODUCTS/i).should('be.visible');
    
    Produtos.verDetalhesDoPrimeiroProduto();
    cy.get('.product-information').within(() => {
      cy.get('h2').should('be.visible');
      cy.contains(/Category:/i).should('be.visible');
      cy.contains(/Availability:/i).should('be.visible');
      cy.contains(/Condition:/i).should('be.visible');
      cy.contains(/Brand:/i).should('be.visible');
    });
  });

  it('Caso 9: Pesquisar produto', () => {
    Produtos.acessarPaginaProdutos();
    Produtos.pesquisarProduto('Tshirt');
    
    // Usa uma verificação case-insensitive e aguarda a renderização dos produtos
    cy.contains(/SEARCHED PRODUCTS/i, { timeout: 10000 }).should('be.visible');
    cy.get('.features_items').should('be.visible');
    cy.get('.productinfo').should('have.length.at.least', 1);
  });

  it('Caso 10: Verificar assinatura na página inicial', () => {
    const emailSubscricao = `subscricao_${Date.now()}@gmail.com`;
    
    cy.scrollTo('bottom');
    cy.contains(/Subscription/i).should('be.visible');
    Produtos.preencherSubscricaoHome(emailSubscricao);
    cy.contains(/You have been successfully subscribed!/i).should('be.visible');
  });

});