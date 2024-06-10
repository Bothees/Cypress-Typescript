import { Given, Then, When} from "@badeball/cypress-cucumber-preprocessor";
import {
    createAccount,
    getTestData,
    parseXmltoJobject,
    registerUser,
    saveTestDataFile,
    updateAccount
} from "../../modules/Utils";
import {faker} from "@faker-js/faker";
import HomePage from "../../modules/HomePage";
const homePage = new HomePage();


export interface customer  {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zipcode: string;
    phone: string;
    ssn: number;
    username: string;
    password: string;
    confirmPassword: string;
}

When(/^I create a new account$/, function () {
    cy.get('@accountDetails').then((  details : any ) => {
        console.log(details[0].customerId);
       const account = details[0];
       createAccount(account.customerId, 0, account.id);
    });
});

Given(/^I register as new user$/, function () {
    let password =  faker.internet.password();
    const user : customer = {
        firstName: faker.person.firstName(),
        lastName : faker.person.lastName(),
        address : faker.location.streetAddress(),
        city : faker.location.city(),
        state : faker.location.state(),
        zipcode : faker.location.zipCode(),
        phone : faker.phone.number(),
        ssn : faker.number.int({min: 0, max: 9999999}),
        username : faker.internet.userName(),
        password : password,
        confirmPassword : password,
    }
    saveTestDataFile('api-user', user);
    registerUser(user);
});

When(/^I get the account ID$/, function () {
    homePage.getAccountId();
});

Given(/^I update an existing account type to SAVINGS$/, function () {
    getTestData<any>('account-info').then(user => {
        console.log(user);
        const jsonFormat = parseXmltoJobject(user);
        console.log(jsonFormat);
        updateAccount(jsonFormat.account.customerId, 1, jsonFormat.account.id);
    });


});

Then(/^account should be updated$/, function () {
    getTestData<any>('update-account').then(updatedAccount => {
        const jsonFormat = parseXmltoJobject(updatedAccount);
        expect(jsonFormat.account.type).to.eq('SAVINGS');
    });
});