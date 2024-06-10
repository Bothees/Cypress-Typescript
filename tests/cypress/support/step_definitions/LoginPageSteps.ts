import LoginPage from "../../modules/LoginPage";
import { Given } from "@badeball/cypress-cucumber-preprocessor";
import {getTestData} from "../../modules/Utils";

const login = new LoginPage();

Given(/^I am Login Page$/, function () {
    login.goToLoginPage();
});

Given(/^I enter username and password$/,  () => {
    getTestData<any>('user1').then(user => {
        login.login(user)
    });
});

Given(/^I should be logged in successfully$/, function () {
    login.verifyUserLoggedIn();
});