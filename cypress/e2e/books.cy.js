Cypress.Commands.add("login", (email = "bropet@mail.ru", password = "123") => {
  cy.get("#mail").should("be.visible").type(email);
  cy.get("#pass").should("be.visible").type(password);
  cy.contains("Авторизоваться").click();
  cy.contains(`Hi, \${email}`).should("be.visible");
});

describe("Кипарис. Тесты приложения для работы с книгами", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Главная страница открывается и отображается", () => {
    cy.get("body").should("be.visible");
    cy.contains("Авторизоваться").should("be.visible");
  });
});

describe("Авторизация", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Успешный вход с валидными кредами", () => {
    cy.get("#mail").should("be.visible").type("bropet@mail.ru");
    cy.get("#pass").should("be.visible").type("123");
    cy.contains("Авторизоваться").click();
    cy.contains("Hi, bropet@mail.ru").should("be.visible");
  });

  it("Вход с пустым email — ошибка", () => {
    cy.get("#pass").clear().type("123");
    cy.contains("Авторизоваться").click();
    cy.contains("Email is required").should("be.visible");
  });

  it("Вход с пустым паролем — ошибка", () => {
    cy.get("#mail").clear().type("bropet@mail.ru");
    cy.contains("Авторизоваться").click();
    cy.contains("Password is required").should("be.visible");
  });
});

describe("Работа с книгами в избранном", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login();
  });

  it("Добавление книги в избранное", () => {
    const bookTitle = "Тестовая книга №1";

    cy.addBookToFavorites(bookTitle);
    cy.contains("Favorites").click();

    cy.get("a.mt-3").contains(bookTitle).should("be.visible");
  });

  it("Удаление книги из избранного", () => {
    const bookTitle = "Тестовая книга №2";

    cy.addBookToFavorites(bookTitle);
    cy.contains("Favorites").click();

    cy.get("a.mt-3")
      .contains(bookTitle)
      .parent()
      .siblings()
      .contains("Удалить")
      .click();

    cy.get("a.mt-3").contains(bookTitle).should("not.exist");
  });

  it("Список избранного пуст после удаления всех книг", () => {
    cy.contains("Favorites").click();
    cy.get("a.mt-3").should("not.exist");
  });
});
