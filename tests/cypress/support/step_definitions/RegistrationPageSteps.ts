import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import RegistrationPage from "../../modules/RegistrationPage";
import {faker} from "@faker-js/faker";
import { saveTestDataFile} from "../../modules/Utils";

const registration = new RegistrationPage();

Given(/^I am on the registration page$/, function () {
    registration.goToRegistration();
});

When(/^I enter the (.*) details on following format$/,  (userFileName: string,dataTable) => {
    // @ts-ignore
    const userData = dataTable.hashes()[0];
    console.log("userData", userData);
    userData.FirstName = faker.person.firstName();
    userData.LastName = faker.person.lastName();
    userData.Address = faker.location.streetAddress();
    userData.City = faker.location.city();
    userData.State = faker.location.state();
    userData.Zipcode = faker.location.zipCode();
    userData.Phone = faker.phone.number();
    userData.SSN = faker.number.int( { min: 0, max: 9999999 });
    userData.Username = `auto-${faker.internet.userName()}`;
    userData.Password = faker.internet.password();
    userData.ConfirmPassword = userData.Password;
    saveTestDataFile(userFileName, userData);
    registration.registerUser( userData);
});

Then(/^I should be registered as new (.*)$/,  (user : string) => {
    registration.verifyUserRegistered(user);
});
