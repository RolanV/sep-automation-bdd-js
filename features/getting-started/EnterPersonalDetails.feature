@sep10
Feature: Enter my Personal details

    As a customer, I should be able to enter my Personal details.

    #* AC1: Default field types and values should be as follows:
    #*          a. First Name: Text field is present.
    #*          b. Last Name: Text field is present.
    #*          c. Email Address: Text field is present and validates for email format.
    #*          d. Phone: The field allows numbers only.

    #* AC2: "How did you hear about us?" A standard dropdown list is present.
    #* AC3: The 'Next' button should be disabled if any required data is missing or invalid.

    #TODO: Create scenarios that cover all the acceptance criteria

    Background:
        Given user is on the enrollment page

    @sep10-1
    Scenario: Verify First Name field is present and editable
        Then user should see the First Name field
        And user should be able to type into the First Name field

    @sep10-2
    Scenario: Verify Last Name field is present and editable
        Then user should see the Last Name field
        And user should be able to type into the Last Name field

    @sep10-3
    Scenario: Verify Email field is present and validates format
        Then user should see the Email Address field
        And user should be able to type into the Email Address field


    @sep10-4
    Scenario: Verify phone field accepts numeric input
        When user enters "1234567890" into the Phone field
        Then the Phone field should be highlighted in blue


    @sep10-5
    Scenario: Verify phone field rejects non-numeric input
        When user enters "abc123" into the Phone field
        Then the Phone field should be highlighted in red



    @sep10-6
    Scenario: Verify How did you hear about us dropdown is present
        Then user should see the How did you hear about us dropdown

    @sep10-7
    Scenario: Verify user can open How did you hear about us dropdown
        When user clicks the How did you hear about us dropdown
        Then user should see dropdown options

    @sep10-8
    Scenario: Verify user can select an option from How did you hear about us dropdown
        When user clicks the How did you hear about us dropdown
        And user selects "LinkedIn" from the How did you hear about us dropdown
        Then the How did you hear about us dropdown should display "LinkedIn"

    @sep10-9
    Scenario: Verify Next button is disabled when all required fields are empty
        Then the Next button should be disabled

    @sep10-10
    Scenario: Verify Next button is disabled when First Name is missing
        When user enters "Doe" into the Last Name field
        And user enters "john.doe@gmail.com" into the Email Address field
        And user enters "1234567890" into the Phone field
        And user selects "LinkedIn" from the How did you hear about us dropdown
        Then the Next button should be disabled

    @sep10-11
    Scenario: Verify Next button is disabled when Last Name is missing
        When user enters "John" into the First Name field
        And user enters "john.doe@gmail.com" into the Email Address field
        And user enters "1234567890" into the Phone field
        And user selects "LinkedIn" from the How did you hear about us dropdown
        Then the Next button should be disabled

    @sep10-12
    Scenario: Verify Next button is disabled when Email Address is missing
        When user enters "John" into the First Name field
        And user enters "Doe" into the Last Name field
        And user enters "1234567890" into the Phone field
        And user selects "LinkedIn" from the How did you hear about us dropdown
        Then the Next button should be disabled

    @sep10-13
    Scenario: Verify Next button is disabled when Email Address is invalid
        When user enters "John" into the First Name field
        And user enters "Doe" into the Last Name field
        And user enters "invalidEmail" into the Email Address field
        And user enters "1234567890" into the Phone field
        And user selects "LinkedIn" from the How did you hear about us dropdown
        Then the Next button should be disabled

    @sep10-14
    Scenario: Verify Next button is disabled when Phone is missing
        When user enters "John" into the First Name field
        And user enters "Doe" into the Last Name field
        And user enters "john.doe@gmail.com" into the Email Address field
        And user selects "LinkedIn" from the How did you hear about us dropdown
        Then the Next button should be disabled

    @sep10-15
    Scenario: Verify Next button is disabled when Phone is invalid
        When user enters "John" into the First Name field
        And user enters "Doe" into the Last Name field
        And user enters "john.doe@gmail.com" into the Email Address field
        And user enters "abc123" into the Phone field
        And user selects "LinkedIn" from the How did you hear about us dropdown
        Then the Next button should be disabled
