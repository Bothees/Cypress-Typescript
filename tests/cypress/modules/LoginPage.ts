import { getTestData } from "./Utils";

const loginUsername = () => cy.get('input[name="username"]');
const loginPassword = () => cy.get('input[name="password"]');
const login = () => cy.get('input[value="Log In"]');
const welcomeMessage = () => cy.get('[id="leftPanel"] p');

export default class LoginPage {

    goToLoginPage() {
        cy.visit('/parabank/index.htm');
    }

    login(user: any) {
        cy.visit('/parabank/index.htm');
        loginUsername().type(user.Username);
        loginPassword().type(user.Password);
        login().click();
    }

    verifyUserLoggedIn() {
        getTestData<any>('user1').then(user => {
            welcomeMessage().then((locator) => {
                expect(locator.text()).contains(`${user.FirstName} ${user.LastName}`);
            });
        });
    }
}