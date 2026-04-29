import { Given, Then, When } from "@cucumber/cucumber";
import { expect} from "@playwright/test";
import { reviewPaymentPage,confirmationPage, startApplicationPage, paymentPlanPage, page } from "../../globalPagesSetup.js";
import { productInfo } from "../../utilities/qa-data-reader.js";


When('user types valid card information', async function () {
    await reviewPaymentPage.enterCardNumber();
});

When('user types valid expiration date', async function () {
    await reviewPaymentPage.enterExpiryDate("12/28");
});

When('user types valid CVC number', async function () {
    await reviewPaymentPage.enterCVC("368");
});

When('user type valid zip code', async function () {
    await reviewPaymentPage.enterZipCode("22102");
});

When("user checks the terms and conditions checkbox", async function () {
    await reviewPaymentPage.clickTermsAndConditionsCheckbox();
});

When("user clicks on the Pay button", async function () {
    await reviewPaymentPage.clickPayButton();
});
