@sep08
Feature: Display the steps of the checkout process

    As a customer, I should be able to know where I am in the checkout process using the stepper.

    #* AC1: The system should display the steps of the checkout process as "1-Start Application", "2-Payment Plan", and "3-Review".
    #* AC2: The system should highlight "Start Application" in blue.
    #* AC3: The system should display "Payment Plan" and "Review" in grey.


    #TODO: Create scenarios that cover all the acceptance criteria

    Background:
        Given user is on the enrollment page
    
    @sep08-1 @regression
    Scenario:Verify that system should Display the steps of the checkout process
        Then the system should display the steps of the checkout process as "Start Application", "Payment plan", and "Review"
        And the system should highlight "step1" in "blue"
        And the system should display "step2" and "step3" in "grey"
    

        
