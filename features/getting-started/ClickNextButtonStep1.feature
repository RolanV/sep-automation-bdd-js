@sep19
Feature: Click on the next button on step 1

    As a customer, I should be able to click on the next button on step 1 when I give valid information.

    #* AC1: The next button should take customers to step 2 when given valid information.
    #*              a. Test by providing all fields
    #*              b. Test by providing only the required fields
    

    #TODO: Create scenarios that cover all the acceptance criteria

    Background:
        Given user is on the enrollment page
    
    @sep19-1 @smoke
    Scenario: verify that user can click the next button with valid information
        When user fills in all the fields with valid information
        And user clicks on the next button
        Then user should be navigated to payment plan section and see the payment plan stepper is "blue"  


    @sep19-2 @smoke
    Scenario: verify that user can click the next button with only required fields filled
        When user fills in only the required fields with valid information
        And user clicks on the next button
        Then user should be navigated to payment plan section and see the payment plan stepper is "blue"