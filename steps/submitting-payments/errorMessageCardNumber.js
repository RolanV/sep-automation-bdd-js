import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { reviewPaymentPage, page } from "../../globalPagesSetup.js";
import { productInfo } from "../../utilities/qa-data-reader.js";


When("user enters {string} as card number", async function (string) {
    await reviewPaymentPage.enterCardNumber(string);
});

When("user clicks terms and condition box", async function () {
  await reviewPaymentPage.clickTermsAndConditionsCheckbox();
});

Then("the error message {string} should be displayed", async function (string) {
  await expect (reviewPaymentPage.cardNumberErrorMessage).toHaveText(string);
});