import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { reviewPaymentPage, page } from "../../globalPagesSetup.js";
import { productInfo } from "../../utilities/qa-data-reader.js";

When("user types an incorrect or short CVC number", async function () {
    await reviewPaymentPage.enterCVC("12");
    await reviewPaymentPage.enterZipCode("12")
});

Then("user should see error message {string}", async function (errorMessage) {
    let actualErrorMessage = await reviewPaymentPage.cardCVCErrorMessage.textContent();
    await expect (actualErrorMessage.trim()).toBe(errorMessage);
});