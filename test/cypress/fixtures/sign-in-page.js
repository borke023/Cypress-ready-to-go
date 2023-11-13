require('cypress-xpath');

export class SignInPage {
    constructor() {
        
    }

    messages = {
        incorrectSignInMsg: () => cy.get('.message-error').contains('The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later.'),
        emailErrorMsg: () => cy.get('#email-error'),
        pwdErrorMsg: () => cy.get('#pass-error')
    }

    // labels = {
        
    // }

    elements = {
    homePageLink: ()  => cy.visit('https://magento.softwaretestingboard.com/'),
        //  koristim xpath samo da vidim kako radi i da li radi.
    signInHome: () => cy.xpath('/html/body/div[2]/header/div[1]/div/ul/li[2]/a').contains('Sign In'),
    emailField: () => cy.get('#email'),
    pwdField: () => cy.get('#pass'),
    signInBtn: () => cy.get('#send2'),
    signInCheck: () => cy.get('.greet:visible')
    }
}