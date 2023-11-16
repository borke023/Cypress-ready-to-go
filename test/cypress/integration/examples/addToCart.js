/// <reference types="Cypress" />
import { CartPage } from "../../fixtures/cartPage";
import { SignInPage } from "../../fixtures/sign-in-page";
import { HomePage } from "../../fixtures/homePage";
import { ProductPage } from "../../fixtures/productPage";

describe('Add to Cart automated tests', function () {
    const sip = new SignInPage();
    const hp = new HomePage();
    const cp = new CartPage();
    const pp = new ProductPage();

    it('Adding available product to the cart while user is not logged in from Home page using product card in Hot Sellers section', function () {
        sip.elements.homePageLink();
        hp.elements.hotSellersItem().each(($el, index, $list) => {
            const productTitle = $el.find('.product-item-name').text();
            //!Menjanjem ovog Includes dela biram za koji ce proizvod da mi bira velicinu
            if (productTitle.includes('Hero Hoodie')) {
                //!Ovim ovde biram koju velicinu ce da izabere
                cy.wrap($el).find('.size > .swatch-attribute-options').find('[option-label="XL"]').click();
                //!Ovo ovde bira boju samo se promeni ovaj drugi .find na boju koju hocemo
                cy.wrap($el).find('.color > .swatch-attribute-options').find('[option-label="Green"]').click();

                cy.wrap($el).find('form button').click({ force: true });
                //!Provera poruke
                hp.messages.messageSuccess().should('contain', 'You added Hero Hoodie to your shopping cart.');
            }
        })
        //!Ulazi u cart preko male cart ikonice u nav menu
        hp.elements.cartIcon().click();
        hp.elements.cartItemName().should('contain', 'Hero Hoodie');
        //!Klikce na Proceed to Checkout dugme
        hp.elements.cartIcon().click();
        hp.elements.cartCheckoutBtn().click();
        //!Ceka da se ucita stranica i proverava da li smo na Shipping stranici
        cy.wait(7000);
        cp.elements.shippingPageTitle().should('have.text', 'Shipping Address');
    })

    it('Adding available product to the cart from product page', function () {
        sip.elements.homePageLink();
        hp.elements.hotSellersItem().each(($el, index, $list) => {
            const productTitle = $el.find('.product-item-name').text();
            //!Menjanjem ovog Includes dela biram za koji ce proizvod da mi bira velicinu
            if (productTitle.includes('Argus All-Weather Tank')) {
                //! Klik na naslov proizvoda da bismo otisli na product page tog prorizvoda
                hp.elements.hotSellersItemTitle().contains('Argus All-Weather Tank').click();
                //!Provera da li smo na dobroj stranici
                pp.elements.productPageTitle().should('contain', 'Argus All-Weather Tank');
                //!Selektovanje opcija za porudzbinu
                pp.elements.productSizes().find('[option-label="S"]').click();
                pp.elements.productColors().find('[option-label="Gray"]').click();
                pp.elements.productPageAtcBtn().click();
                //!Provera error messaga koji se ocekuje jer smo izabrali proizvod kojeg nema na stanju
                pp.messages.errMessage().should('contain', 'The requested qty is not available');
                //!Menjanje opcija 
                pp.elements.productSizes().find('[option-label="L"]').click();
                pp.elements.productQty().clear().type('4');
                pp.elements.productPageAtcBtn().click();
                //!Provera  poruke o uspesnom dodavanju u korpu
                pp.messages.succMessage().should('contain', 'You added Argus All-Weather Tank to your shopping cart.');
            }
        })
        //! Proverava da li je proizvod koji smo dodali u korpi
        hp.elements.cartIcon().click();
        hp.elements.cartItemName().should('contain', 'Argus All-Weather Tank');
        //! Proverava da li je quantity proizvoda okej
        hp.elements.cartTotalItems().should('contain', '4')
        //! Menja Qty proizvoda
        hp.elements.cartQtyField().clear().type('5');
        hp.elements.cartUpdateBtn().click();
        //! Proverava da li je uspesno promenjeno tj da li je Qty sada 5
        hp.elements.cartTotalItems().should('contain', '5')
        //! Klikce na link za view cele korpe i proverava da li je sve kako treba
        hp.elements.cartViewLink().click();
        cp.elements.cartPageProductTitle().should('contain', 'Argus All-Weather Tank');
        cp.elements.cartPageQtyField().should('have.value', '5');

        //! Test Case 3 - do ovog koraka je isto, tako da moze da se spoji i istesitra i ovo kad sam vec tu :)
        //!Menja Qty proizvoda sa cartPage
        cp.elements.cartPageQtyField().clear().type('2');
        cp.elements.cartPageUpdateBtn().click();
        cy.wait(5000);
        //! Proverava da li su provere izvrsene
        cp.elements.cartPageQtyField().should('have.value', '2');
        //! Pritiska dugme za brisanje i proverava da li je nasa korpa sada prazna kako se ocekuje
        cp.elements.cartPageDeleteIcon().click();
        cp.messages.cartPageEmptyCartMsg().should('contain', 'You have no items in your shopping cart.');
    })

    it('User trying to add to the cart item that is not available through the product card in the "Hot Sellers" section', function () {
        sip.elements.homePageLink();
        hp.elements.hotSellersItem().each(($el, index, $list) => {
            const productTitle = $el.find('.product-item-name').text();
            //!Menjanjem ovog Includes dela biram za koji ce proizvod da mi bira velicinu
            if (productTitle.includes('Argus All-Weather Tank')) {
                //!Ovim ovde biram koju velicinu ce da izabere
                cy.wrap($el).find('.size > .swatch-attribute-options').find('[option-label="S"]').click();
                //!Ovo ovde bira boju samo se promeni ovaj drugi .find na boju koju hocemo
                cy.wrap($el).find('.color > .swatch-attribute-options').find('[option-label="Gray"]').click();

                cy.wrap($el).find('form button').click({ force: true });
                //!Provera poruke
                pp.elements.productPageTitle().should('contain', 'Argus All-Weather Tank');
                pp.messages.errMessage().should('contain', 'The requested qty is not available');
            }
        })
    })

    it('User tries to add to cart product with not all options selected and to add product with invalid Quantity', function () {
        sip.elements.homePageLink();
        hp.elements.hotSellersItem().each(($el, index, $list) => {
            const productTitle = $el.find('.product-item-name').text();
            //!Menjanjem ovog Includes dela biram za koji ce proizvod da mi bira velicinu
            if (productTitle.includes('Hero Hoodie')) {
                //! Klik na naslov proizvoda da bismo otisli na product page tog prorizvoda
                hp.elements.hotSellersItemTitle().contains('Hero Hoodie').click();
                //!Provera da li smo na dobroj stranici
                pp.elements.productPageTitle().should('contain', 'Hero Hoodie');
                //!Selektovanje samo velicine
                pp.elements.productSizes().find('[option-label="XL"]').click();
                pp.elements.productPageAtcBtn().click();
                //!provera da li je ispisana error porukica
                pp.messages.smallMsg().should('contain', 'This is a required field.')
                //!selektovanje i ostalih atributa, ali stavljanje kolicine na 0
                pp.elements.productColors().find('[option-label="Green"]').click();
                pp.elements.productQty().clear().type('0');
                pp.elements.productPageAtcBtn().click();
                pp.messages.smallMsg().should('contain', 'Please enter a quantity greater than 0.');
            }
        })
    })
})