import {getTestData} from "./Utils";

const registerLink = () => cy.contains('Register');
const firstName = () => cy.get('input[id="customer.firstName"]');
const lastName = () => cy.get('input[id="customer.lastName"]');
const address = () => cy.get('input[id="customer.address.street"]');
const city = () => cy.get('input[id="customer.address.city"]')
const state = () => cy.get('input[id="customer.address.state"]');
const zipcode = () => cy.get('input[id="customer.address.zipCode"]');
const phone = () => cy.get('input[id="customer.phoneNumber"]');
const ssn = () => cy.get('input[id="customer.ssn"]');
const username = () => cy.get('input[id="customer.username"]');
const password = () => cy.get('input[id="customer.password"]');
const confirmPassword = () => cy.get('input[id="repeatedPassword"]');
const register = () => cy.get('input[value="Register"]');
const loginUsername = () => cy.get('input[name="username"]');
const loginPassword = () => cy.get('input[name="password"]');
const login = () => cy.get('input[value="Log In"]');
const welcomeMessage = () => cy.get('[id="leftPanel"] p');

export default class RegistrationPage {

    goToRegistration() {
        cy.visit('/parabank/index.htm');
        registerLink().click();
    }

    registerUser(userData: any) {
        firstName().type(userData.FirstName, { delay : 100});
        lastName().type(userData.LastName, { delay : 100});
        address().type(userData.Address);
        city().type(userData.City);
        state().type(userData.State);
        zipcode().type(userData.Zipcode);
        phone().type(userData.Phone);
        ssn().type(userData.SSN);
        username().type(userData.Username);
        password().type(userData.Password);
        confirmPassword().type(userData.ConfirmPassword);
        register().click();
    }

    login(user: any) {
        cy.visit('/parabank/index.htm');
        loginUsername().type(user.Username);
        loginPassword().type(user.Password);
        login().click();
    }

    verifyUserRegistered(userFileName: string) {
        getTestData<any>(userFileName).then(user => {
            welcomeMessage().then((locator) => {
                expect(locator.text()).contains(`${user.FirstName} ${user.LastName}`);
            });
        });
    }
}