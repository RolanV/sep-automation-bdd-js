import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { startApplicationPage, page } from "../../globalPagesSetup.js";
import { productInfo } from "../../utilities/qa-data-reader.js";

Then("the system should display the steps of the checkout process as {string}, {string}, and {string}",async function (startApplication, paymentPlan, review) {
        await expect(await startApplicationPage.startApplicationStepCircleText.textContent()).toBe(startApplication);
        await expect(await startApplicationPage.paymentPlanStepCircleText.textContent()).toBe(paymentPlan);
        await expect(await startApplicationPage.reviewStepCircleText.textContent()).toBe(review);
  });


  Then("the system should highlight {string} in {string}",
    async function (step, color) {
      await startApplicationPage.verifyStepperColor(step, color);
    }
  );


  Then("the system should display {string} and {string} in {string}",
    async function (step2, step3, grey) {
        await startApplicationPage.verifyStepperColor(step2, grey, "border-top-color");
        await startApplicationPage.verifyStepperColor(step3, grey, "border-top-color");
    }
  );
