@sep27
Feature: Error messages for the invalid expiration number

    As a user, I want to be informed when my card's expiration date has failed. 


    #* AC1: 1. An immediate error message should be thrown if the expiration number is too short or wrong:
    #*                  Your card's expiration date is incomplete.
    #*                  Your card's expiration year is in the past.


     #TODO: Create scenarios that cover all the acceptance criteria


    Background:
        Given user is on the enrollment page
        And user completed the start application step
        And user has completed payment plan step
        
    @sep27-1
    Scenario: Verify that immediate error message should be thrown if the expiration number is too short or wrong
        When  user types an incorrect or short expiration number
        Then user should see error message Your card’s expiration date is incomplete.
    
    @sep27-2
    Scenario: Verify that immediate error message should be thrown if the expiration year is in the past
        When user types an expiration year that is in the past
        Then user should see error message Your card’s expiration year is in the past.


