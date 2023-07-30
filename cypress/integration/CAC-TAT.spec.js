/// <reference types="Cypress" />

describe("Central de Atendimento ao Cliente TAT", function () {
    beforeEach(function () {
        cy.visit("./src/index.html");
    });

    it("Verifica o título da aplicação", function () {
        cy.title().should("eq", "Central de Atendimento ao Cliente TAT");
    });

    it("Preenche os campos obrigatórios e envia o formulário", function () {
        cy.get('input[id="firstName"]')
            .type("Rafaela")
            .should("have.value", "Rafaela");

        cy.get('input[id="lastName"]').type("Souza").should("have.value", "Souza");

        cy.get('input[id="email"]')
            .type("rafaelasouza@hotmail.com")
            .should("have.value", "rafaelasouza@hotmail.com");

        cy.get('textarea[id="open-text-area"]')
            .type("Lorem Ipsum is simply dummy text of the printing and typesetting industry.", { delay: 0 })

        cy.contains('button', 'Enviar')
            .click()

        cy.get('.success')
            .should('be.visible')
    });

    it("Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", function () {
        cy.get('input[id="firstName"]')
            .type("Rafaela")
            .should("have.value", "Rafaela");

        cy.get('input[id="lastName"]').type("Souza").should("have.value", "Souza");

        cy.get('input[id="email"]')
            .type("rafaelasouzahotmail.com")
            .should("have.value", "rafaelasouzahotmail.com");

        cy.get('textarea[id="open-text-area"]')
            .type("Lorem Ipsum is simply dummy text of the printing and typesetting industry.", { delay: 0 })

        cy.get('button[type="submit"]')
            .click()

        cy.get('[class="error"]')
            .should('be.visible')

    });

    it("Valida que o campo telefone não aceita um valor não-numérico ", function () {
        cy.get('#phone')
            .type('teste')
            .should("have.value", '');
    });

    it("Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", function () {
        cy.get('input[id="firstName"]')
            .type("Rafaela")

        cy.get('input[id="lastName"]')
            .type("Souza")

        cy.get('input[id="email"]')
            .type("rafaelasouza@hotmail.com")

        cy.get('textarea[id="open-text-area"]')
            .type("Lorem Ipsum is simply dummy text of the printing and typesetting industry.", { delay: 0 })

        cy.get('input[id="phone-checkbox"]')
            .check()

        cy.get('button[type="submit"]')
            .click()

        cy.get('[class="error"]')
            .should('be.visible')
    });

    it("Preenche e limpa os campos nome, sobrenome, email e telefone", function () {
        cy.get('input[id="firstName"]')
            .type("Rafaela")
            .should("have.value", "Rafaela")
            .clear()
            .should("have.value", '')

        cy.get('input[id="lastName"]')
            .type("Souza")
            .should("have.value", "Souza")
            .clear()
            .should("have.value", '')

        cy.get('input[id="email"]')
            .type("rafaelasouza@hotmail.com")
            .should("have.value", "rafaelasouza@hotmail.com")
            .clear()
            .should("have.value", '')

        cy.get('input[id="phone"]')
            .type(984841771)
            .should("have.value", 984841771)
            .clear()
            .should("have.value", '')
    });

    it("Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios", function () {
        cy.get('button[type="submit"]')
            .click()

        cy.get('[class="error"]')
            .should('be.visible')
    });

    it("Envia o formulário com sucesso usando um comando customizado", function () {
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('[class="success"]')
            .should('be.visible')
    });

    it("Seleciona um produto (YouTube) por seu texto", function () {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    });

    it("Seleciona um produto (Mentoria) por seu valor (value)", function () {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    });

    it("Seleciona um produto (Blog) por seu índice", function () {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    });

    it("Marca o tipo de atendimento Feedback", function () {
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback')
    });

    it("Marca cada tipo de atendimento", function () {
        cy.get('input[type="radio"]')
        .each(function($radio) {
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })

    });

    it("Marca ambos checkboxes, depois desmarca o último", function () {
        cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last().uncheck()
        .should('not.be.checked')
    });

    it("Seleciona um arquivo da pasta fixtures", function () {
        cy.get('#file-upload')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json')
        .then(input =>{
            expect(input[0].files[0].name).eq('example.json')
        })
    });

    it("Seleciona um arquivo simulando um drag-and-drop", function () {
        cy.get('#file-upload')
        .selectFile('cypress/fixtures/example.json', {action : 'drag-drop'})
        .then(input =>{
            expect(input[0].files[0].name).eq('example.json')
        })
    });

    
    it("Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias", function () {
        cy.fixture('example.json').as('exampleFile')
        cy.get('#file-upload')
        .selectFile('@exampleFile')
        .then(input =>{
            expect(input[0].files[0].name).eq('example.json')
        })
    });

    it("Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique", function () {
        cy.get('#privacy a')
        .should('have.attr', 'target','_blank')
    });

    it("Acessa a página da política de privacidade removendo o target e então clicando no link", function () {
        cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()
    });

    






})
