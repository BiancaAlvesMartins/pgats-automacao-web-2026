class Login {
  preencherLogin(email, senha) {
    cy.visit('/login');
    cy.get('[data-qa="login-email"]').should('be.visible').type(email, { force: true });
    cy.get('[data-qa="login-password"]').should('be.visible').type(senha, { force: true });
    cy.get('[data-qa="login-button"]').click({ force: true });
  }

  fazerLogout() {
    cy.get('a[href="/logout"]', { timeout: 10000 }).should('be.visible').click({ force: true });
  }
}

export default new Login();