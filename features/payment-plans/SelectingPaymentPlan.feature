@sep14 @regression
Feature: Selecting a price plan

    As a customer, I want to be able to Choose a payment plan from the available options 
    so that I can choose the one that best suits my needs.

    #* AC1: When the user selects any payment plan (Accordion) that option should be highlighted to indicate selection.
    #* AC2: Upon selecting any pricing option, the 'Next' button should become active (indicating the user can proceed).
    #* AC3: Users should be able to change their plan selections at any time before finalizing their choice.


    #TODO: Create scenarios that cover all the acceptance criteria

    Background: 
        Given user is on the enrollment page
        Given user completed the start application step

    @sep14-1 @smoke
    #* AC1: When the user selects any payment plan (Accordion) that option should be highlighted to indicate selection.
    Scenario: Verify that user selects any payment plan (Accordion) that option should be highlighted to indicate selection.
        When user select "upfront" plan 
        Then the upfront plan should be highlighted to indicate selection
    
    @sep14-2
    #* AC1: When the user selects any payment plan (Accordion) that option should be highlighted to indicate selection.
    Scenario: Verify that user selects any payment plan (Accordion) that option should be highlighted to indicate selection.
        When user select "installments" plan
        Then the installments plan should be highlighted to indicate selection

    @sep14-3 @smoke
    #* AC2: Upon selecting any pricing option, the 'Next' button should become active (indicating the user can proceed).
    Scenario: Verify that upon selecting any pricing option, the 'Next' button should become active (indicating the user can proceed).
        When user select "upfront" plan 
        Then the Next button should become active

    @sep14-4
    #* AC3: Users should be able to change their plan selections at any time before finalizing their choice.
    Scenario: Verify that users should be able to change their plan selections at any time before finalizing their choice.
        When user select "upfront" plan 
        And user change selection to "installments" plan
        Then the installments plan should be highlighted to indicate selection
