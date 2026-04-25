@sep16
Feature: Click on the next button on payment plans page   #! Test Only

    As a customer, I should be able to click on the next button on step 2 when I select a plan.

    #* AC1: Clicking on any plan should activate the next button
    #* AC2: When the customer clicks on the next button, the Step 3 page should be displayed.
    #* AC3: In the stepper, steps 1 and 2 should be green, and step 3 should be blue.
    #* AC4: The payment component should be displayed.
    #* AC5: A price summary should be displayed.
    #* AC6: The back button should be displayed and enabled.

    #TODO: Create scenarios that cover all the acceptance criteria

    Background:
        Given user is on the enrollment page
        And user completed the start application step

    @sep16-1 @regression
    #* AC1: Clicking on any plan should activate the next button
    Scenario Outline: Verify that clicking on any payment plan should activate the next button
        Then the next button is disabled by default
        When user select "<paymentPlan>" plan
        Then the next button is enabled

        Examples: Payment Plan Options
            | paymentPlan  |
            | Upfront      |
            | Installments |


    @sep16-2 @regression
    #* AC2: When the customer clicks on the next button, the Step 3 page should be displayed.
    #* AC3: In the stepper, steps 1 and 2 should be green, and step 3 should be blue.
    Scenario: Verify after clicking next button, the Step3 stepper color is blue
        When user select "upfront" plan
        And user clicks on the next button
        Then the review step stepper circle is blue
        And the payment step circle is green
        And the start aplication stepper circle is green


    @sep16-3 @regression
    #* AC4: The payment component should be displayed.
    #* AC5: A price summary should be displayed.
    Scenario: Veridy that payment component should be displayed
        When user select "upfront" plan
        Then the upfront payment plan summary is displayed
        When user select "installments" plan
        Then the installments payment plan summary is displayed


    @sep16-4 @regression
    #* AC6: The back button should be displayed and enabled.
    Scenario: Verify that back button should be displayed and enabled.
        Then the back button is displayed and enabled
        When user clicks the back button
        Then user should be navigated back to start application step





# @sep16-1 @regression
# Scenario: Verify that clicking on upfont payment plan should activate the next button
#     Then the next button is disabled by default
#     When user select upfont payment plan
#     Then the next button is enabled

# @sep16-2 @regression
# Scenario: Verify that clicking on installments payment plan should activate the next button
#     Then the next button is disabled by default
#    When user select installments payment plan
#    Then the next button is enabled