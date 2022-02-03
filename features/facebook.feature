Feature: Facebook login validation

  Scenario: Should throw error on incorrect credentials
    Given I am on facebook login page
    When I enter wrong credentials and login
   