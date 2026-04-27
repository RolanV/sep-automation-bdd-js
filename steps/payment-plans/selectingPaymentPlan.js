import { Given, Then, When } from "@cucumber/cucumber";
import { expect} from "@playwright/test";
import { paymentPlanPage, startApplicationPage, page } from "../../globalPagesSetup.js";
import { productInfo } from "../../utilities/qa-data-reader.js";


 Then("the upfront plan should be highlighted to indicate selection",async function () {
    await paymentPlanPage.verifyUpfrontPlanIsHighlighted();
    
});

Then("the installments plan should be highlighted to indicate selection",async function () {
    await paymentPlanPage.verifyInstallmentPlanIsHighlighted();
});

Then("the Next button should become active", async function () {
    await expect(paymentPlanPage.activeNextButton).toBeEnabled();
});

When("user change selection to {string} plan", async function (planOption) {
    await paymentPlanPage.selectPaymentPlan(planOption);
    await paymentPlanPage.verifyInstallmentPlanIsHighlighted();
});
