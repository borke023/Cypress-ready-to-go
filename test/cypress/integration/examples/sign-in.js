//cypress  - Spec
/// <reference types="Cypress" />
import { SignInPage } from "../../fixtures/sign-in-page";

describe('Sign-in functionality test!', function () {
   const sip = new SignInPage();

    const validEmail = 'bulovan.boris@gmail.com';
    const validPassword = 'Pajaparadajz023';
    const invalidEmail = 'invalid@invalid.invalid';
    const invalidPassword = '@Sifra123';
    const wrongFormatEmail = 'boris.bulovan';

    it('Valid crecdentials used for sign-in', function () {
        sip.elements.homePageLink();
        sip.elements.signInHome().contains('Sign In').click();
        sip.elements.emailField().type(validEmail);
        sip.elements.pwdField().type(validPassword);
        sip.elements.signInBtn().click();
        sip.elements.signInCheck().contains('Welcome');
    })

    it('invalid email and invalid password used for sign-in', function () {
        sip.elements.homePageLink();
        sip.elements.signInHome().contains('Sign In').click();
        sip.elements.emailField().type(invalidEmail);
        sip.elements.pwdField().type(invalidPassword);
        sip.elements.signInBtn().click();
        sip.messages.incorrectSignInMsg().contains('The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later.');
    })

    it('valid email and invalid password used for sign-in', function () {
        sip.elements.homePageLink();
        sip.elements.signInHome().contains('Sign In').click();
        sip.elements.emailField().type(validEmail);
        sip.elements.pwdField().type(invalidPassword);
        sip.elements.signInBtn().click();
        sip.messages.incorrectSignInMsg().contains('The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later.');
    })

    it('wrong format email and valid password used for sign-in ', function () {
        sip.elements.homePageLink();
        sip.elements.signInHome().contains('Sign In').click();
        cy.wait(2000);
        sip.elements.signInBtn().click();
        sip.messages.emailErrorMsg().contains('This is a required field.');
        sip.messages.pwdErrorMsg().contains('This is a required field.');
    })

    it('wrong format email and valid password used for sign-in ', function () {
        sip.elements.homePageLink();
        sip.elements.signInHome().contains('Sign In').click();
        sip.elements.emailField().type(wrongFormatEmail);
        sip.elements.pwdField().type(validPassword);
        sip.elements.signInBtn().click();
        sip.messages.emailErrorMsg().contains('Please enter a valid email address (Ex: johndoe@domain.com).');
    })
})