require('cypress-xpath');

export class ProductPage {
    constructor() {
        
    }

    messages = {
        errMessage: () => cy.get('.message-error'),
        succMessage: () => cy.get('.message-success'),
    }

    // labels = {
        
    // }

    elements = {
        productPageTitle: () => cy.get('.page-title'),
        productSizes: () => cy.get('.size > .swatch-attribute-options'),
        productColors: () =>  cy.get('.color > .swatch-attribute-options'),
        productQty: () => cy.get('#qty'),
        productPageAtcBtn: () => cy.get('#product-addtocart-button'),
    }
}