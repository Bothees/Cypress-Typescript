Feature: Implement a Feature with Scenario Outline

  Scenario Outline: Test - Open <account> Account
    Given I am on the registration page
    When I enter the user2 details on following format
      | FirstName | LastName | Address     | City    | State | ZipCode | Phone  | SSN  | Username | Password | ConfirmPassword |
      | testFirst | testLast | test street | testing | Test  | 1000    | 123456 | 3355 | testing  | password | password |
    Then I should be registered as new user2
    Given I open new <account>
    Then I should have opened new <account>
    Examples:
      |account   |
      |CHECKING  |
      |SAVINGS   |
