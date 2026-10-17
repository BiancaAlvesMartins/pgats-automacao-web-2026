class Checkout {
  adicionarPrimeiroProdutoAoCarrinho() {
    cy.get('a[href="/products"]').click({ force: true });
    // Clica no primeiro produto
    cy.get('.add-to-cart').first().click({ force: true });
    // Clica apenas no primeiro elemento do modal/link de visualização do carrinho
    cy.get('.modal-confirm .btn-success, u[style*="cursor: pointer"], .modal-body a[href="/view_cart"]')
      .first()
      .click({ force: true });
  }

  prosseguirParaCheckout() {
    cy.get('.btn-default.check_out').first().click({ force: true });
  }

  preencherDadosPagamento(nomeCartao, numeroCartao, cvc, mes, ano) {
    cy.get('a[href="/payment"]').click({ force: true });
    cy.get('[data-qa="name-on-card"]').clear().type(nomeCartao, { force: true });
    cy.get('[data-qa="card-number"]').clear().type(numeroCartao, { force: true });
    cy.get('[data-qa="cvc"]').clear().type(cvc, { force: true });
    cy.get('[data-qa="expiry-month"]').clear().type(mes, { force: true });
    cy.get('[data-qa="expiry-year"]').clear().type(ano, { force: true });
    cy.get('[data-qa="pay-button"]').click({ force: true });
  }

  deletarConta() {
    cy.get('a[href="/delete_account"]').click({ force: true });
    cy.get('[data-qa="continue-button"]').click({ force: true });
  }
}

export default new Checkout();