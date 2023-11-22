/// <reference types="Cypress" />
import { ApiLinks } from "../../fixtures/support.js";
import {changedReqBody, reqBody} from "../../fixtures/body-helper.js";


const url = new ApiLinks();
const body = reqBody();
const diffReqBody = changedReqBody();
const petId = body.id;
const diffPetId = diffReqBody.id;

describe('First API Tests', function(){
    it('Using POST method to send information to the server',function(){
        cy.request({
            method: "POST",
            url: url.links.base_api_url,
            body: body,
          }).then(
            (response) => {
                expect(response).to.have.property("status", 200);
                expect(response.body).to.have.property("id",2331);
                expect(response.body).to.have.property("name","Mirko");
                expect(response.body.category).to.have.property("name","Pulin");
                
            } 
        )
    })

    it('Using GET method to retrive information about the pet from the server',function(){
        cy.request({
            method: "GET",
            url: url.links.base_api_url + '/'+ petId,
          }).then(
            (response) => {
                expect(response).to.have.property("status", 200);
                expect(response.body).to.have.property("id",2331);
                expect(response.body).to.have.property("name","Mirko");
                expect(response.body.category).to.have.property("name","Pulin");
            } 
        )
    })

    it('Using PUT method to change information about the pet on the server',function(){
        cy.request({
            method: "PUT",
            url: url.links.base_api_url,
            body: diffReqBody,
          }).then(
            (response) => {
                expect(response).to.have.property("status", 200);
                expect(response.body).to.have.property("id",111222333);
                expect(response.body).to.have.property("name","Paula");
                expect(response.body.category).to.have.property("name","Bulldog");
            } 
        )
    })

    it('Using GET method to retrive informtion about the pets by their status',function(){
        const status = 'available';

        cy.request({
            method: "GET",
            url: url.links.base_api_url + '/'+ 'findByStatus?status='+ status,
          }).then(
            (response) => {
                const foundObject = response.body.find(obj => obj.id === 111222333);
                expect(foundObject, 'Object with id 111222333 not found in the response').to.exist;
                expect(foundObject).to.have.property("id",111222333);
                expect(foundObject).to.have.property("name","Paula");
                expect(foundObject.category).to.have.property("name","Bulldog");
                
            } 
        )
    })

    it('Using GET method to retrive informtion about the pets by their status',function(){
        cy.request({
            method: "DELETE",
            url: url.links.base_api_url + '/'+ diffPetId,
          }).then(
            (response) => {
                expect(response.body).to.have.property("code",200);
                expect(response.body).to.have.property("message", diffPetId.toString());
            } 
        )
    })
})