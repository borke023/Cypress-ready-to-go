/// <reference types="Cypress" />
import { CartPage } from "../../fixtures/cartPage";
import { SignInPage } from "../../fixtures/sign-in-page";
import { HomePage } from "../../fixtures/homePage";
import { ProductPage } from "../../fixtures/productPage";

const sip = new SignInPage();
const hp = new HomePage();
const cp = new CartPage();
const pp = new ProductPage();


const productOneName = "Hero Hoodie";
const productTwoName = "Argus All-Weather Tank";

describe('Add to Cart automated tests', function () {
    it('Adding available product to the cart while user is not logged in from Home page using product card in Hot Sellers section', function () {
        sip.elements.homePageLink();
        //! Funkcija za dodavaje producta iz Hot Sellers sekcije sa hope page-a
        selectProductAddToCart(productOneName,'XL','Green');
        hp.messages.messageSuccess().should('contain', `You added ${productOneName} to your shopping cart.`);
        //!Ulazi u cart preko male cart ikonice u nav menu
        hp.elements.cartIcon().click();
        cy.wait(2000);
        //? Ovaj ovde assert nekada padne iako se pokaze poruka u cartu ne bude item
        hp.elements.cartItemName().should('contain', productOneName);
        //!Klikce na Proceed to Checkout dugme
        hp.elements.cartIcon().click();
        hp.elements.cartCheckoutBtn().click({force:true});
        //!Ceka da se ucita stranica i proverava da li smo na Shipping stranici
        cp.elements.shippingPageTitle().should('have.text', 'Shipping Address');
    })

    it('Adding available product to the cart from product page', function () {
        sip.elements.homePageLink();
        selectProductToVisit(productTwoName)
        //!Selektovanje opcija za porudzbinu
        izaberiOpcije_PP('S','Gray');
        //!Provera error messaga koji se ocekuje jer smo izabrali proizvod kojeg nema na stanju
        cy.wait(2000)
        pp.messages.errMessage().should('contain', 'The requested qty is not available');
        //!Menjanje opcija 
        izaberiOpcije_PP('L',undefined,'4');
        //!Provera  poruke o uspesnom dodavanju u korpu
        pp.messages.succMessage().should('contain', `You added ${productTwoName} to your shopping cart.`);
        //! Proverava da li je proizvod koji smo dodali u korpi
        hp.elements.cartIcon().click();
        hp.elements.cartItemName().should('contain', productTwoName);
        //! Proverava da li je quantity proizvoda okej
        hp.elements.cartTotalItems().should('contain', '4')
        //! Menja Qty proizvoda
        hp.elements.cartQtyField().clear().type('5');
        hp.elements.cartUpdateBtn().click();
        //! Proverava da li je uspesno promenjeno tj da li je Qty sada 5
        hp.elements.cartTotalItems().should('contain', '5')
        //! Klikce na link za view cele korpe i proverava da li je sve kako treba
        hp.elements.cartViewLink().click();
        cp.elements.cartPageProductTitle().should('contain', productTwoName);
        cp.elements.cartPageQtyField().should('have.value', '5');

        //! Test Case 3 - do ovog koraka je isto, tako da moze da se spoji i istesitra i ovo kad sam vec tu :)
        //!Menja Qty proizvoda sa cartPage
        cp.elements.cartPageQtyField().clear().type('2');
        cp.elements.cartPageUpdateBtn().click();
        //! Proverava da li su provere izvrsene
        cp.elements.cartPageQtyField().should('have.value', '2');
        //! Pritiska dugme za brisanje i proverava da li je nasa korpa sada prazna kako se ocekuje
        cp.elements.cartPageDeleteIcon().click();
        cp.messages.cartPageEmptyCartMsg().should('contain', 'You have no items in your shopping cart.');
    })

    it('User trying to add to the cart item that is not available through the product card in the "Hot Sellers" section', function () {
        sip.elements.homePageLink();
        selectProductAddToCart(productTwoName,'S','Gray');
        pp.elements.productPageTitle().should('contain', productTwoName);
        pp.messages.errMessage().should('contain', 'The requested qty is not available');
    })

    it('User tries to add to cart product with not all options selected and to add product with invalid Quantity', function () {
        sip.elements.homePageLink();
        selectProductToVisit(productOneName);
        izaberiOpcije_PP('XL',undefined,undefined);
        pp.messages.smallMsg().should('contain', 'This is a required field.')
        izaberiOpcije_PP(undefined,'Green','0');
        pp.messages.smallMsg().should('contain', 'Please enter a quantity greater than 0.');
    })
})

//* *****************************************************************************************************************

//* FUNKCIJE 

//* *****************************************************************************************************************


//! Funkcija pomocu koje se bira odredjeni produkt is skecije Hot Sellers na ciju ce se product stranicu doci
function selectProductToVisit(productName) {
    hp.elements.hotSellersItem().each(($el, index, $list) => {
        const productTitle = $el.find('.product-item-name').text();
        //!Menjanjem ovog Includes dela biram za koji ce proizvod da mi bira velicinu
        if (productTitle.includes(productName)) {
            //! Klik na naslov proizvoda da bismo otisli na product page tog prorizvoda
            hp.elements.hotSellersItemTitle().contains(productName).click();
            pp.elements.productPageTitle().should('contain', productName);
        }
    })
}


//!Funkcija koja ce odmah u Hot Sellers sekciji izabrati velicinu i boju proizvoda i poruciti ga
function selectProductAddToCart(productName, size, color)
{
    hp.elements.hotSellersItem().each(($el, index, $list) => {
        const productTitle = $el.find('.product-item-name').text();
        //!Menjanjem ovog Includes dela biram za koji ce proizvod da mi bira velicinu
        if (productTitle.includes(productName)) {
            //!Ovim ovde biram koju velicinu ce da izabere
            cy.wrap($el).find('.size > .swatch-attribute-options').find(`[option-label="${size}"]`).click();
            //!Ovo ovde bira boju samo se promeni ovaj drugi .find na boju koju hocemo
            cy.wrap($el).find('.color > .swatch-attribute-options').find(`[option-label="${color}"]`).click();

            cy.wrap($el).find('form button').click({ force: true });
        }
    }) 
}

//! funkcija koja ce izabrati velicinu, boju i kolicinu dok smo na product pageu, moze da izabere i samo neke od opcije
//! ne moraju sve 3 opcije da se unesu, znaci ako necemo recimo da selektujemo boju na drugoj poziciji i pozivu funkcije napisem undefined kao argument

function izaberiOpcije_PP(size, color, qty)
{
    if (size != undefined)
    {
        pp.elements.productSizes().find(`[option-label="${size}"]`).click();
    }

    if(color != undefined)
    {
        pp.elements.productColors().find(`[option-label="${color}"]`).click();
    }

    if(qty != undefined)
    {
        pp.elements.productQty().clear().type(qty);
    }
    pp.elements.productPageAtcBtn().click();
}