@sep09 @regression
Feature: Display the product information

    As a customer, I should be able to see the product information.

    #* AC1: The product name should be displayed on the information card.
    #* AC2: The product name on the information card matches the product name on the left side of the screen.
    #* AC3: The price of the product should be displayed.
    #* AC4: The text indicating a flexible payment plan should be available and displayed.
    #* AC5: The program start date should be displayed.
    #* AC6: The return policy and the final date for returns should be displayed.


    #TODO: Create scenarios that cover all the acceptance criteria

    Background:
        Given user is on the enrollment page


    @sep09-1
    #* AC1: The product name should be displayed on the information card.
    Scenario:Verify that the product name is displayed on the information card
        Then user should see the product name on the information card

    @sep09-2
    #* AC2: The product name on the information card matches the product name on the left side of the screen.
    Scenario:Verify that the product name on the information card matches the product name on the left side of the screen
        Then user should see that the product name on the information card matches the product name on the left side of the screen

    @sep09-3 @smoke
    #* AC3: The price of the product should be displayed.
    Scenario:Verify that the price of the product is displayed
        Then user should see the price of the product displayed on the information card

    @sep09-4
    #* AC4: The text indicating a flexible payment plan should be available and displayed.
    Scenario:Verify that the text indicating a flexible payment plan is available and displayed
        Then user should see the text indicating a flexible payment plan displayed on the information card

    @sep09-5
    #* AC5: The program start date should be displayed.
    Scenario:Verify that the program start date is displayed
        Then user should see the program start date displayed on the information card

    @sep09-6
    #* AC6: The return policy and the final date for returns should be displayed.
    Scenario:Verify that the return policy and the final date for returns are displayed
        Then user should see the return policy and the final date for returns displayed on the information card