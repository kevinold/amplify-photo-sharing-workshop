/// <reference types="cypress" />

Cypress.Commands.add("getBySel", (selector, ...args) => cy.get(`[data-test=${selector}]`, ...args));
Cypress.Commands.add("getBySelLike", (selector, ...args) =>
  cy.get(`[data-test*=${selector}]`, ...args)
);

// Reference
// https://www.matthewburfield.com/cypress-end-to-end-tests-on-amplify-deploy-pipeline/
/*Cypress.Commands.add("loginToCognito", (username, password) => {
  cy.visit("/")
    .get("[data-test=username-input]")
    .type(username)
    .get("[data-test=sign-in-password-input]")
    .type(password)
    .get("[data-test=sign-in-sign-in-button]")
    .click();
});*/

Cypress.Commands.add("loginWithCognitoByApi", (username, password) =>
  cy
    .task("loginCognitoUserByApi", {
      username,
      password,
    })
    .as("cognitoResponse")
    .get("@cognitoResponse")
    .then((cognitoResponse) => {
      const keyPrefixWithUsername = `${cognitoResponse.keyPrefix}.${cognitoResponse.username}`;
      window.localStorage.setItem(
        `${keyPrefixWithUsername}.idToken`,
        cognitoResponse.signInUserSession.idToken.jwtToken
      );
      window.localStorage.setItem(
        `${keyPrefixWithUsername}.accessToken`,
        cognitoResponse.signInUserSession.accessToken.jwtToken
      );
      window.localStorage.setItem(
        `${keyPrefixWithUsername}.refreshToken`,
        cognitoResponse.signInUserSession.refreshToken.token
      );
      window.localStorage.setItem(
        `${keyPrefixWithUsername}.clockDrift`,
        cognitoResponse.signInUserSession.clockDrift
      );
      window.localStorage.setItem(
        `${cognitoResponse.keyPrefix}.LastAuthUser`,
        cognitoResponse.username
      );
      window.localStorage.setItem("amplify-authenticator-authState", "signedIn");
    })
);
