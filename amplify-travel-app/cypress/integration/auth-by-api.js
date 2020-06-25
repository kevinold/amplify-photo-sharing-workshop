/// <reference types="cypress" />

describe("Cognito Authentication by API", () => {
  beforeEach(() => {
    cy.fixture("cognito-users").then((users) => {
      const user = users[0];
      cy.loginWithCognitoByApi(user.username, `s3cret123$`);
    });
    cy.visit("/");
  });

  it("display the home page after logged in", () => {
    cy.getBySel("new-post-button").should("be.visible");
  });
});
