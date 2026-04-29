import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { paymentPlanPage, page } from "../../globalPagesSetup.js";
import { productInfo } from "../../utilities/qa-data-reader.js";

Then("user should see the  payment plan name Upfront and the price",async function () {
   let actualPaymentPlanText = await paymentPlanPage.upFrontTexy01.textContent();
   let expectedPaymentPlan = "Upfront";
   let actualPriceText = await paymentPlanPage.upfrontPaymentAmount.textContent(); // "$400 pay once"
   let expectedPrice = "$400";

   expect(actualPaymentPlanText.toLowerCase().trim()).toBe(expectedPaymentPlan.toLowerCase().trim());
   expect(actualPriceText).toContain(expectedPrice);
});


Then("user should see the  payment plan name Installments and the price",async function () {
     let actualPaymentPlanText = await paymentPlanPage.installmentsText.textContent();
     let expectedPaymentPlan = "5 installments";
     let actualPriceText = await paymentPlanPage.installmentsPaymentAmount.textContent(); // "$100 per month"
     let expectedPrice = "$100";

     expect(actualPaymentPlanText.toLowerCase().trim()).toBe(expectedPaymentPlan.toLowerCase().trim());
     expect(actualPriceText).toContain(expectedPrice);
});