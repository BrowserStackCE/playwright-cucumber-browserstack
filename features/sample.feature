Feature: BstackDemo

    As a user
    I want to preform search workflow on BstackDemo

    Scenario: Performing workflows on BstackDemo
        Given I open bstackdemo homepage
        When I add to cart and checkout
        Then I Attempt to login