export class SignInPage {
    constructor() {
        
    }

    messages = {
        incorrectSignInMsg: () => cy.get('.message-error'),
        emailErrorMsg: () => cy.get('#email-error'),
        pwdErrorMsg: () => cy.get('#pass-error')
    }

    // labels = {
        
    // }

    elements = {
    homePageLink: ()  => cy.visit('https://magento.softwaretestingboard.com/'),
    signInHome: () => cy.get('.panel > .header > .authorization-link > a'),
    emailField: () => cy.get('#email'),
    pwdField: () => cy.get('#pass'),
    signInBtn: () => cy.get('#send2'),
    signInCheck: () => cy.get('.greet:visible')
    }
}