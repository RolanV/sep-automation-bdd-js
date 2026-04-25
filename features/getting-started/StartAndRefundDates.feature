@sep11 @regression
Feature: Program start dates and Refund dates

    As a customer, I want to see the program start dates and refund policy details before enrolling
    so that I can make informed decisions.

    #* AC1: Program Start date and refund dates must be displayed in Step 1 in Test Automation with Selenium Program.

    #TODO: Create scenarios that cover all the acceptance criteria

    Background:
        Given user is on the enrollment page

    @sep11-1 @regression
    Scenario: Verify that the program start date and refund date are displayed
        Then the program start date should be displayed
        And the program refund date should be displayed

    @sep11-2 @regression
    Scenario: Verify that the program start date and refund date are accurate
        Then the program start date should be accurate according to the program schedule
        And the program refund date should be accurate according to the program schedule


