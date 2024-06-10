import {getTestData} from "./Utils";
import LoginPage from "./LoginPage";

const login = new LoginPage();
const openAccount = () => cy.contains('Open New Account');
const account = () => cy.get('input[value="Open New Account"]');
const accountResult = () => cy.get('[id="openAccountResult"]');
const transferLink = () => cy.contains('Transfer Funds');
const amount = () => cy.get('input[id="amount"]');
const transfer = () => cy.get('input[value="Transfer"]');

export default class HomePage {

    loginToHomePage() {
        login.goToLoginPage();
        getTestData<any>('new-user').then(user => {
            login.login(user)
        });
    }

    createAccount(accountType : string) {
        cy.intercept('GET', '/parabank/services_proxy/bank/customers/**/accounts').as('account');
        cy.intercept('POST', '/parabank/services_proxy/bank/createAccount?**').as('createAccount');
        openAccount().click();
        cy.wait('@account').then( ({ response }: any)=> {
            expect(response.statusCode).to.be.equal(200);
        });
        cy.get('select').eq(0).select(accountType);
        account().click();
        cy.wait('@createAccount').then(({ response }: any) => {
            console.log(response.body.type);
        });
    }

    verifyAccount(accountType : string) {
        accountResult().then((locator) => {
            expect(locator.text()).contains('Account Opened!');
        })
    }

    getAccountId = () : any => {
        cy.intercept('GET', 'parabank/services_proxy/bank/customers/**/accounts').as('accountOverview');
        cy.contains('Accounts Overview').click();
        cy.wait('@accountOverview').then( ({ response }: any)=> {
            cy.wrap(response.body).as('accountDetails');
        });
    }
}