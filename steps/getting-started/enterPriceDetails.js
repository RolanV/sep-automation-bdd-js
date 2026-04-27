import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { startApplicationPage, page } from "../../globalPagesSetup.js";
import { productInfo } from "../../utilities/qa-data-reader.js";
import { faker } from "@faker-js/faker";

Then("user should see the First Name field", async function () {
    await expect (startApplicationPage.firstNameInputBox).toBeVisible();
    await expect(startApplicationPage.firstNameInputBox).toBeEditable();
});


Then("user should be able to type into the First Name field",async function () {
    await startApplicationPage.enterFirstName(faker.person.firstName());
});


Then("user should see the Last Name field", async function () {
    await expect(startApplicationPage.lastNameInputBox).toBeVisible();
    await expect(startApplicationPage.lastNameInputBox).toBeEditable();
});

Then("user should be able to type into the Last Name field",async function () {
    await startApplicationPage.enterLastName(faker.person.lastName());
});


Then("user should see the Email Address field", async function () {
    await expect(startApplicationPage.emailInputBox).toBeVisible();
    await expect(startApplicationPage.emailInputBox).toBeEditable();
});

Then("user should be able to type into the Email Address field",async function () {
    await startApplicationPage.enterEmail(faker.internet.email());
});


When("user enters {string} into the Phone field", async function (number) {
      await expect(startApplicationPage.phoneNumberInputBox).toBeVisible();
      await expect(startApplicationPage.phoneNumberInputBox).toBeEditable();
      await startApplicationPage.enterPhoneNumber(number);
      await startApplicationPage.phoneNumberInputBox.press('Enter');

});

Then("the Phone field should be highlighted in blue", async function () {
    await expect(startApplicationPage.phoneNumberInputBox_VerificationColor).toHaveCSS("caret-color", "rgb(63, 81, 181)"); 
});

Then("the Phone field should be highlighted in red", async function () {
    await expect(startApplicationPage.phoneNumberInputBox_VerificationColor).toHaveCSS("caret-color", "rgb(244, 67, 54)"); 
});





Then("user should see the How did you hear about us dropdown",async function () {},
);

When(
  "user clicks the How did you hear about us dropdown",
  async function () {},
);

When(
  "user selects {string} from the How did you hear about us dropdown",
  async function (string) {},
);

Then(
  "the How did you hear about us dropdown should display {string}",
  async function (string) {},
);

Then("user should see dropdown options", async function () {});

Then("the Next button should be disabled", async function () {});

When(
  "user enters {string} into the Last Name field",
  async function (string) {},
);

When(
  "user enters {string} into the Email Address field",
  async function (string) {},
);

When(
  "user enters {string} into the First Name field",
  async function (string) {},
);

