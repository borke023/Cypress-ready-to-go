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
            const wantedProductTitle = $el.find('.product-item-name').text();
            //Menjanjem ovog Includes dela biram za koji ce proizvod da mi bira velicinu
            if(wantedProductTitle.includes('Hero Hoodie'))
            {
                //Ovim ovde biram koju velicinu ce da izabere
                cy.wrap($el).find('.size > .swatch-attribute-options').find('[option-label="XL"]').click();
                //Ovo ovde bira boju samo se promeni ovaj drugi .find na boju koju hocemo
                cy.wrap($el).find('.color > .swatch-attribute-options').find('[option-label="Green"]').click();

                cy.wrap($el).find('form button').click({force:true});
                //Provera poruke
                hp.messages.messageSuccess().should('contain','You added Hero Hoodie to your shopping cart.');
            }
        })
        hp.elements.cartIcon().click();

        hp.elements.cartItemName().should('contain','Hero Hoodie');

        hp.elements.cartIcon().click();

        hp.elements.cartCheckoutBtn().click();

        cp.elements.shippingPageTitle().should('have.text','Shipping Address');
    })

    it('Adding available product to the cart from product page', function () {
        sip.elements.homePageLink();
        hp.elements.hotSellersItem().each(($el, index, $list) => {
            const wantedProductTitle = $el.find('.product-item-name').text();
            //Menjanjem ovog Includes dela biram za koji ce proizvod da mi bira velicinu
            if(wantedProductTitle.includes('Argus All-Weather Tank'))
            {
                // Klik na naslov proizvoda da bismo otisli na product page tog prorizvoda
                hp.elements.hotSellersItemTitle().contains('Argus All-Weather Tank').click();
                //Provera da li smo na dobroj stranici
                pp.elements.productPageTitle().should('contain','Argus All-Weather Tank');
                //Selektovanje opcija za porudzbinu
                pp.elements.productSizes().find('[option-label="S"]').click();
                pp.elements.productColors().find('[option-label="Gray"]').click();
                pp.elements.productPageAtcBtn().click();
                //Provera error messaga koji se ocekuje jer smo izabrali proizvod kojeg nema na stanju
                pp.messages.errMessage().should('contain','The requested qty is not available');
                //menjanje opcija 
                pp.elements.productSizes().find('[option-label="L"]').click();
                pp.elements.productQty().clear().type('4');
                pp.elements.productPageAtcBtn().click();
                //Provera  poruke o uspesnom dodavanju u korpu
                pp.messages.succMessage().should('contain','You added Argus All-Weather Tank to your shopping cart.');
            }
        })
        hp.elements.cartIcon().click();

        hp.elements.cartItemName().should('contain','Argus All-Weather Tank');
        hp.elements.cartTotalItems().should('contain','4')
        hp.elements.cartQtyField().clear().type('5');
        hp.elements.cartUpdateBtn().click();
        hp.elements.cartTotalItems().should('contain','5') 
        hp.elements.cartViewLink().click();
        cp.elements.cartPageProductTitle().should('contain','Argus All-Weather Tank');
        cp.elements.cartPageQtyField().should('have.value','5');
    
    })
})