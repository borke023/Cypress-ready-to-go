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
        sip.elements.signInHome().click();
        sip.elements.emailField().type(validEmail);
        sip.elements.pwdField().type(validPassword);
        sip.elements.signInBtn().click();
        sip.elements.signInCheck().contains('Welcome');
    })

    it('invalid email and invalid password used for sign-in', function () {
        sip.elements.homePageLink();
        sip.elements.signInHome().click();
        sip.elements.emailField().type(invalidEmail);
        sip.elements.pwdField().type(invalidPassword);
        sip.elements.signInBtn().click();
        sip.messages.incorrectSignInMsg();
    })

    it('valid email and invalid password used for sign-in', function () {
        sip.elements.homePageLink();
        sip.elements.signInHome().click();
        sip.elements.emailField().type(validEmail);
        sip.elements.pwdField().type(invalidPassword);
        sip.elements.signInBtn().click();
        sip.messages.incorrectSignInMsg();
    })

    it('wrong format email and valid password used for sign-in ', function () {
        sip.elements.homePageLink();
        sip.elements.signInHome().click();
        cy.wait(2000);
        sip.elements.signInBtn().click();
        sip.messages.emailErrorMsg().contains('This is a required field.');
        sip.messages.pwdErrorMsg().contains('This is a required field.');
    })

    it('wrong format email and valid password used for sign-in ', function () {
        sip.elements.homePageLink();
        sip.elements.signInHome().click();
        sip.elements.emailField().type(wrongFormatEmail);
        sip.elements.pwdField().type(validPassword);
        sip.elements.signInBtn().click();
        // ovo contain nisam mogao da prebacim u page object file jer koristi isti id za ovu poruku i poruku u testu izad
        // a tekst poruke je drugaciji tako da moram ovako ili da pravim dve razlicite metode
        sip.messages.emailErrorMsg().contains('Please enter a valid email address (Ex: johndoe@domain.com).');
    })
})