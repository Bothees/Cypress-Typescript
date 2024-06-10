Feature: Implement a Feature for API create and update functionality

  Scenario: Test - Create an account using API
    Given I am on the registration page
    When I enter the api-user details on following format
      | FirstName | LastName | Address     | City    | State | ZipCode | Phone  | SSN  | Username | Password | ConfirmPassword |
      | testFirst | testLast | test street | testing | Test  | 1000    | 123456 | 3355 | testing  | password | password |
    And I get the account ID
    Then I create a new account

  Scenario: Test - Update an account using API
    Given I update an existing account type to SAVINGS
    Then account should be updated