require('cypress-xpath');

export class CartPage {


    messages = {
        cartPageEmptyCartMsg: () => cy.get('.cart-empty'),
    }

    // labels = {

    // }

    elements = {
        //Shipping page
        shippingPageTitle: () => cy.get('#shipping > .step-title'),

        //Cart page
        cartPageQtyField: () => cy.get('[title="Qty"]'),
        cartPageProductTitle: () => cy.get('.product-item-name'),
        cartPageUpdateBtn: () => cy.get('[title="Update Shopping Cart"]'),
        cartPageDeleteIcon: () => cy.get('[title="Remove item"]:visible'),
    }
}