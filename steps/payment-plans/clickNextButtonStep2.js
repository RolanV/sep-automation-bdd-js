import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { paymentPlanPage, startApplicationPage, page } from "../../globalPagesSetup.js";
import { productInfo } from "../../utilities/qa-data-reader.js";


//!Step Defenitons scripts:

Then("the next button is disabled by default", async function () {
  await expect(paymentPlanPage.inactiveNextButton).toBeDisabled();
});


When("user select {string} plan", async function (string) {
  await paymentPlanPage.selectPaymentPlan(string);
});


Then("the next button is enabled", async function () {
  await expect(paymentPlanPage.activeNextButton).toBeEnabled();
});


When("user clicks on the next button", async function () {
    await paymentPlanPage.clickNextButton();
});


Then("the review step stepper circle is blue", async function () {
    await expect(startApplicationPage.reviewStepCircle)
    .toHaveCSS("background-color","rgb(1, 201, 255)");
});


Then("the start aplication stepper circle is green", async function () {
    await expect(startApplicationPage.startApplicationStepCircle).toHaveCSS(
      "background-color","rgb(172, 245, 138)");
});


Then("the payment step circle is green", async function () {
  await expect(startApplicationPage.paymentPlanStepCircle)
    .toHaveCSS("background-color","rgb(172, 245, 138)");
});


Then("the upfront payment plan summary is displayed", async function () {
   await expect(paymentPlanPage.basePriceAmountUnderUpfront).toBeVisible();
   await expect(paymentPlanPage.upfrontDiscountAmountUnderUpfront).toBeVisible();
   await expect (paymentPlanPage.subtotalAmountUnderUpfront).toBeVisible();
});


Then("the installments payment plan summary is displayed", async function () {
   await expect(paymentPlanPage.basePriceAmountUnderInstallments).toBeVisible();
   await expect(paymentPlanPage.installmentsNumberUnderInstallments).toBeVisible();
   await expect(paymentPlanPage.pricePerInstallmentsAmountUnderInstallments).toBeVisible();
   await expect(paymentPlanPage.firstMonthPaymentTextUnderInstallments).toBeVisible();
});


Then("the back button is displayed and enabled", async function () {
    await expect(paymentPlanPage.backButton).toBeEnabled();
});


When("user clicks the back button", async function () {
    await paymentPlanPage.backButton.click();
});


Then("user should be navigated back to start application step", async function () {
     await expect(startApplicationPage.startApplicationStepCircle).toHaveCSS(
       "background-color","rgb(1, 201, 255)");
    });
