import { Given, Then, When } from "@cucumber/cucumber";
import { expect} from "@playwright/test";
import { startApplicationPage, page } from "../../globalPagesSetup.js";
import { productInfo } from "../../utilities/qa-data-reader.js";


Then("the program start date should be displayed", async function () {
    await expect(startApplicationPage.programStartDate).toBeVisible();
});

Then("the program refund date should be displayed", async function () {
    await expect(startApplicationPage.refundEndDate).toBeVisible();
});

Then("the program start date should be accurate according to the program schedule",async function () {
    const ACTUAL_START_DATE = await startApplicationPage.programStartDate.innerText();
    const EXPECTED_START_DATE = productInfo.startDate;

    //console.log(`Actual Start Date: ${ACTUAL_START_DATE}`);
    //console.log(`Expected Start date: ${EXPECTED_START_DATE}`);
    //console.log(`Expected Upfront price: ${productInfo.prices[0].baseAmount}`);
    //console.log(`Expected Upfront discount amount price: ${productInfo.prices[0].couponDiscount}`);
    expect (ACTUAL_START_DATE).toBe(EXPECTED_START_DATE);
});

Then("the program refund date should be accurate according to the program schedule",async function () {
      const ACTUAL_REFUND_DATE = await startApplicationPage.refundEndDate.innerText();
      const EXPECTED_REFUND_DATE = productInfo.refundDate;

      //console.log(`Actual Refund Date: ${ACTUAL_REFUND_DATE}`);
      //console.log(`Expected Refund date: ${EXPECTED_REFUND_DATE}`);
      expect(ACTUAL_REFUND_DATE).toBe(EXPECTED_REFUND_DATE);
});
