require('cypress-xpath');

export class HomePage {


    messages = {
        messageSuccess: () => cy.get('.message-success'),
    }

    // labels = {

    // }

    elements = {
        //elements of the navigation menu
        cartIcon: () => cy.get('.showcart'),
        cartItemName: () => cy.get('.item > :nth-child(1) > .product-item-details > .product-item-name'),
        cartTotalItems: () => cy.get('.count'),
        cartQtyField: () => cy.get('.cart-item-qty'),
        cartUpdateBtn: () => cy.get('.update-cart-item'),
        cartCheckoutBtn: () => cy.get('#top-cart-btn-checkout'),
        cartViewLink: () => cy.contains('View and Edit Cart'),

        //home page elements
        hotSellersItem: () => cy.get('.product-items').find('.product-item'),
        hotSellersItemTitle: () => cy.get('.product-items').find('.product-item-name'),
        sizeBtn: () => cy.get('.size > .swatch-attribute-options'),
    }
}