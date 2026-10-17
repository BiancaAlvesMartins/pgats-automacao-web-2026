class Produtos {
  acessarPaginaProdutos() {
    cy.get('a[href="/products"]').click();
  }

  verDetalhesDoPrimeiroProduto() {
    cy.get('.choose > .nav > li > a').first().click();
  }

  pesquisarProduto(nomeProduto) {
    cy.get('#search_product').type(nomeProduto);
    cy.get('#submit_search').click();
  }

  preencherSubscricaoHome(email) {
    cy.get('#susbscribe_email').type(email);
    cy.get('#subscribe').click();
  }
}

export default new Produtos();