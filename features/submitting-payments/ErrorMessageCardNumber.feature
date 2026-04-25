@sep25
Feature: Error message for the invalid card number

    As a user, I want to be informed when my card info has failed.

    #* AC1: An immediate error message should be thrown if the card number is wrong
    #* or too short:
    #*              Your card number is incomplete.
    #*              Your card number is invalid.


    #TODO: Create scenarios that cover all the acceptance criteria

    Background:
        Given user is on the enrollment page
        And user completed the start application step
        And user has completed payment plan step

    @sep25-1 @smoke
    Scenario Outline: Verify that an error message should be thrown if the card number is too short
        When user enters "<shortCardNumber>" as card number
        And user clicks terms and condition box
        Then the error message "Your card number is incomplete." should be displayed

        Examples: Test Data
            | shortCardNumber |
            | 12345678        |
            | 123456789       |

    @sep25-2 @smoke
    Scenario Outline: Verify that an error message should be thrown if the card number is wrong
        When user enters "<WrongCardNumber>" as card number
        And user clicks terms and condition box
        Then the error message "Your card number is invalid." should be displayed

        Examples: Test Data
            | WrongCardNumber     |
            | 1111 1111 1111 1111 |
            | 1234 5876 9493 0445 |

