@sep29 @regression
Feature: Error message for the invalid CVC number

    As a user, I want to be informed when the CVC number I enter is incorrect or too short.

    #* AC1: The Immediate error message should be thrown if the CVC number is too short or wrong. "Your card's security code is incomplete."


    #TODO: Create scenarios that cover all the acceptance criteria

    Background:
        Given user is on the enrollment page
        And user completed the start application step
        And user has completed payment plan step

    @sep29-1
    Scenario: Verify user sees an error message when CVC number is too short
        When user types an incorrect or short CVC number
        Then user should see error message "Your security code is incomplete."
    
