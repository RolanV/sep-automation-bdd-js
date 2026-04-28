import { Given, Then, When } from "@cucumber/cucumber";
import { expect} from "@playwright/test";
import { reviewPaymentPage, page } from "../../globalPagesSetup.js";
import { productInfo } from "../../utilities/qa-data-reader.js";

When('user types an expiration year that is in the past', async function () {
    await reviewPaymentPage.enterExpiryDate("12/12");
    await reviewPaymentPage.enterZipCode("12");
});

Then('user should see error message Your card’s expiration year is in the past.', async function () {
    const errorMessage = await reviewPaymentPage.cardExpiryErrorMessage.textContent();
    expect(errorMessage).toBe("Your card’s expiration year is in the past.");
});


When('user types an incorrect or short expiration number', async function () {
   await reviewPaymentPage.enterExpiryDate("12");
    reviewPaymentPage.enterZipCode("12");
});

Then('user should see error message Your card’s expiration date is incomplete.', async function () {
    const errorMessage = await reviewPaymentPage.cardExpiryErrorMessage.textContent();
    expect(errorMessage).toBe("Your card’s expiration date is incomplete.");
});