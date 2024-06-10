import HomePage from "../../modules/HomePage";
import { Given, Then, When} from "@badeball/cypress-cucumber-preprocessor";

const homePage = new HomePage();

Given(/^I am an on homePage$/, () =>  {
    homePage.loginToHomePage();
});

When(/^I open new (.*)$/,  (accountType : string) => {
    homePage.createAccount(accountType);
});

Then(/^I should have opened new (.*)$/, (accountType : string) => {
    homePage.verifyAccount(accountType);
});
