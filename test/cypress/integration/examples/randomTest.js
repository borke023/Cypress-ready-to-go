/// <reference types="Cypress" />
require('cypress-xpath');

describe('Sign-in functionality test!', function () {

    it('Web table Xpath test', function () {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/');
        cy.xpath('/html/body/div[3]/div[1]/fieldset/table/tbody/tr/td[2]').each(($el, index, $list) => {
            const tableText = $el.text();

            if (tableText.includes('Master Selenium Automation in simple Python Language')) {
                cy.xpath('/html/body/div[3]/div[1]/fieldset/table/tbody/tr/td[2]').eq(index).next().then(function (price) {
                    const priceText = price.text();
                    expect(priceText).to.equal('25');
                })
            }
        })
    })
})