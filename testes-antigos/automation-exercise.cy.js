/// <reference types="cypress" />

describe('Automation Exercise - Teste com XPath', () => {

  it('Cadastrar um novo usuário com sucesso', () => {
    // 1. Visita a página inicial
    cy.visit('https://www.automationexercise.com')

    // 2. Clica no menu Signup / Login usando XPath
    cy.xpath('//a[contains(@href, "login")]').click()

    // 3. Preenche Nome e E-mail no formulário de Cadastro
    cy.xpath('//*[@data-qa="signup-name"]').type('PGATS Aut')
    cy.xpath('//*[@data-qa="signup-email"]').type('pgats-aut-test@mail.com')

    // 4. Clica no botão de Signup
    cy.xpath('//*[@data-qa="signup-button"]').click()

    // 5. Seleciona o radio button de gênero (Mrs.)
    cy.xpath('//*[@id="id_gender2"]').check()

    // 6. Preenche a senha
    cy.xpath('//*[@data-qa="password"]').type('12345')

    // 7. Seleciona o dia de nascimento
    cy.xpath('//*[@data-qa="days"]').select('1')

    // 8. Marca a checkbox da newsletter
    cy.xpath('//*[@id="newsletter"]').check()
  })

})