@sep07 @regression
Feature: View Product Landing Page

    As a customer, I should be able to see the product landing page.

    #* AC1: The system displays the text "Cydeo Secure Checkout".
    #* AC2: The system should display the program name.
    #* AC3: Users should see a footer on the left side of the page that includes by order:
    #*      logo, Terms and Conditions, Privacy Policy, Disclaimer, Cookie Policy

    #* AC4: The system displays "Need help? Contact us at enrollment@cydeo.com" in the footer on the right.


    #TODO: Create scenarios that cover all the acceptance criteria


    Background:
        Given user is on the enrollment page


    @sep07-1
    #* AC1: The system displays the text "Cydeo Secure Checkout".
    Scenario: Verify the product landing page displays "Secure checkout"
        Then user should see the text "Secure checkout" on the page


    @sep07-2
    #* AC2: The system should display the program name.
    Scenario: Verify the product landing page displays the program name
        Then user should see the program name on the page


    @sep07-3
    #* AC3: Users should see a footer on the left side of the page that includes by order:
    #*      logo, Terms and Conditions, Privacy Policy, Disclaimer, Cookie Policy
    Scenario: Verify user should see a footer on the left side of the page that includes by order: logo, Terms and Conditions, Privacy Policy, Disclaimer, Cookie Policy
        Then user should see the following elements:
            | Terms and Conditions |
            | Privacy Policy       |
            | Disclaimer           |
            | Cookie Policy        |


    @sep07-4
    #* AC4: The system displays "Need help? Contact us at enrollment@cydeo.com" in the footer on the right.
    Scenario: Verify that the system displays following options: "Need help?", "Contact us at enrollment@cydeo.com" in the footer on the right.
        Then user should see the following text "Need help? Contact us at enrollment@cydeo.com"
