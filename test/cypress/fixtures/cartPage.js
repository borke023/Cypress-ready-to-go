require('cypress-xpath');

export class CartPage {
    constructor() {
        
    }

    messages = {

    }

    // labels = {
        
    // }

    elements = {
        //Shipping page
        shippingPageTitle: () => cy.get('#shipping > .step-title'),

        //Cart page
        cartPageQtyField: () => cy.get('[title="Qty"]'),
        cartPageProductTitle: () => cy.get('.product-item-name'),
    }
}