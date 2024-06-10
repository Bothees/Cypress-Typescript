import Chainable = Cypress.Chainable;
import {XMLParser} from "fast-xml-parser";

export function saveTestDataFile(name: string, testData: any) {
    cy.wrap(testData).as(name);
    cy.writeFile(`cypress/fixtures/${name}.json`, JSON.stringify(testData));
}

export function getTestData<T>(fileName: string): Chainable<T> {
    return cy.readFile(`cypress/fixtures/${fileName}.json`);
}

export function createAccount (customerId: number, newAccountType : number, fromAccountId : number) {
    cy.request({
        method: 'POST',
        url: `/parabank/services/bank/createAccount?customerId=${customerId}&newAccountType=${newAccountType}&fromAccountId=${fromAccountId}`,
    }).then((response) => {
        console.log('response', response);
        expect(response.status).to.be.equal(200);
        saveTestDataFile('account-info', response.body);
    });
}

export function updateAccount (customerId: number, newAccountType : number, fromAccountId : number)  {
    cy.request({
        method: 'POST',
        url: `/parabank/services/bank/createAccount?customerId=${customerId}&newAccountType=${newAccountType}&fromAccountId=${fromAccountId}`,
    }).then((response) => {
        console.log('response', response);
        expect(response.status).to.be.equal(200);
        saveTestDataFile('update-account', response.body);
    });
}

export function registerUser(user : any) {
    const body = new URLSearchParams();
    body.append("customer.firstName", `test`);
    body.append("customer.lastName", `${user.lastName}`);
    body.append("customer.address.street", 'tests');
    body.append("customer.address.city", `testcity`);
    body.append("customer.address.state", `teststate`);
    body.append("customer.address.zipCode", `1234`);
    body.append("customer.phoneNumber", `12324343`);
    body.append("customer.ssn", `3432`);
    body.append("customer.username", `test`);
    body.append("customer.password", `password`);
    body.append("repeatedPassword", `password`);
    cy.request({
        method: 'POST',
        url: `customers/update`,
        form : true,
        headers: {
            'Accept': 'text/html,application/xhtml+xml,application/xml',
            'content-type': 'application/x-www-form-urlencoded',
        },
        body :Object.fromEntries(body),
    }).then((response) => {
        console.log('response', response);
        return response.body;
    });
}

export const  parseXmltoJobject = (xmlData: string | Buffer) => {
    const parser = new XMLParser();
    return parser.parse(xmlData);
};