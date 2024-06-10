Feature: Implement a Feature with Data Table

  @test @registration
  Scenario: Test - Register a new user on the application
    Given I am on the registration page
    When I enter the user1 details on following format
      | FirstName | LastName | Address     | City    | State | ZipCode | Phone  | SSN  | Username | Password | ConfirmPassword |
      | testFirst | testLast | test street | testing | Test  | 1000    | 123456 | 3355 | testing  | password | password |
    Then I should be registered as new user1

  @login
  Scenario: Test - Registered user login successfully
    Given I am Login Page
    And I enter username and password
    And I should be logged in successfully