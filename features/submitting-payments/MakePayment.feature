@sep23
Feature: Make a payment

    As a customer, I should be able to make payments so I can enroll in the program.

    #* AC1: When the user enters valid card information, checks the terms and conditions checkbox, 
    #*      and clicks on the Pay button, then they should be redirected to the confirmation page.

    #* AC2: In the stepper, steps 1, 2, 3 should be green.
    #* AC3: The correct program name should be displayed.
    #* AC4: The correct user email should be displayed.
    #* AC5: The correct company contact information should be displayed.


    #TODO: Create scenarios that cover all the acceptance criteria


    Background:
        Given user is on the enrollment page
        And user completed the start application step
        And user has completed payment plan step

    @sep23-1
    Scenario: Validate that user be able to enters valid card information and checks the terms and conditions checkbox and cliks on the pay button
        When user types valid card information
        And user types valid expiration date
        And user types valid CVC number
        And user type valid zip code
        And user checks the terms and conditions checkbox
        And user clicks on the Pay button
       



