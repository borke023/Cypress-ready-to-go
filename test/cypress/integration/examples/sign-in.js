//cypress  - Spec
/// <reference types="Cypress" />
// import { POM } from '../../fixtures/pom';

describe('Sign-in functionality test!', function () {
    const link = 'https://magento.softwaretestingboard.com/';
    const signInHome = '.panel > .header > .authorization-link > a';
    const emailField = '#email';
    const pwdField = '#pass';
    const signInBtn = '#send2';
    const validEmail = 'bulovan.boris@gmail.com';
    const validPassword = 'Pajaparadajz023';
    const signInCheck = '.greet:visible'
    const invalidEmail = 'invalid@invalid.invalid';
    const invalidPassword = '@Sifra123';
    const wrongFormEmail = 'boris.bulovan';

    // it('Valid crecdentials used for sign-in', function () {
    //     // const pom = new POM();
    //     cy.visit(link);
    //     cy.get(signInHome).contains('Sign In').click();
    //     cy.get(emailField).type(validEmail);
    //     cy.get(pwdField).type(validPassword);
    //     cy.get(signInBtn).click();
    //     cy.get(signInCheck).contains('Welcome');
    // })

    // it('invalid email and invalid password used for sign-in', function () {
    //     cy.visit(link);
    //     cy.get(signInHome).contains('Sign In').click();
    //     cy.get(emailField).type(invalidEmail);
    //     cy.get(pwdField).type(invalidPassword);
    //     cy.get(signInBtn).click();
    //     cy.get('.message-error').contains('The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later.');
    // })

    // it('valid email and invalid password used for sign-in', function () {
    //     cy.visit(link);
    //     cy.get(signInHome).contains('Sign In').click();
    //     cy.get(emailField).type(validEmail);
    //     cy.get(pwdField).type(invalidPassword);
    //     cy.get(signInBtn).click();
    //     cy.get('.message-error').contains('The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later.');
    // })

    // it('wrong format email and valid password used for sign-in ', function () {
    //     cy.visit(link);
    //     cy.get(signInHome).contains('Sign In').click();
    //     cy.wait(2000);
    //     cy.get(signInBtn).contains('Sign In').click();
    //     cy.get('#email-error').contains('This is a required field.');
    //     cy.get('#pass-error').contains('This is a required field.');
    // })

    // it('wrong format email and valid password used for sign-in ', function () {
    //     cy.visit(link);
    //     cy.get(signInHome).contains('Sign In').click();
    //     cy.get(emailField).type(wrongFormEmail);
    //     cy.get(pwdField).type(validPassword);
    //     cy.get(signInBtn).click();
    //     cy.get('#email-error').contains('Please enter a valid email address (Ex: johndoe@domain.com).');
    // })
})