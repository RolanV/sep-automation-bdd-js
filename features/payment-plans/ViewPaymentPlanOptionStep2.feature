@sep17 @regression
Feature: View payment plan options in Step 2   #! test only

    As a customer, I should be able to see payment plan options in Step 2.

    #* AC1: Upfront payment:
    #*      There should be only one upfront price
    #*      Text should be:
    #*              Upfront  (first row)
    #*              $ <upfont_price> pay once (second row)

    #* AC2: Installment plans:
    #*      There must be total <num> Payment Plans
    #*      There can be <number_of_installments> installments
    #*      If there are installments:
    #*            Text should be
    #*            <number_of_installments> Installments (first row)
    #*           $ <monthly_price> per month (second row)
    #*            Installment plans should be unique

    #TODO: Create scenarios that cover all the acceptance criteria

    Background:
        Given user is on the enrollment page
        Given user completed the start application step

    @sep17-1 @smoke
    Scenario: Verify upfront payment plan displays correct information.
        When user should be navigated to payment plan section and see the payment plan stepper is "blue"
        And user select "upfront" plan
        And the upfront plan should be highlighted to indicate selection
        Then user should see the  payment plan name Upfront and the price


    @sep17-2 @smoke
    Scenario: Verify installments payment plan displays correct information
        When user should be navigated to payment plan section and see the payment plan stepper is "blue"
        And user select "Installments" plan
        And the installments plan should be highlighted to indicate selection
        Then user should see the  payment plan name Installments and the price
        
