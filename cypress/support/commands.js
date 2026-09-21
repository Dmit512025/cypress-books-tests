Cypress.Commands.add("login", (email = "bropet@mail.ru", password = "123") => {
  cy.get("#mail").type(email);
  cy.get("#pass").type(password);
  cy.contains("Log in").click();
  cy.contains(`Hi, \${email}`).should("be.visible");
});

Cypress.Commands.add("addBookToFavorites", (bookTitle) => {
  cy.contains("Add new").click();
  cy.get("#title").should("be.visible").type(bookTitle);
  cy.contains("Submit").should("be.visible").click();
  cy.contains(bookTitle).should("be.visible");
});
