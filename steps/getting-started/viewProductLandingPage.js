import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { startApplicationPage,leftMainPage, page } from "../../globalPagesSetup.js";
import { productInfo } from "../../utilities/qa-data-reader.js";

Then("user should see the text {string} on the page",async function (companyName) {
    let acatualText = await leftMainPage.secureCheckout.textContent();
    await expect (acatualText.trim()).toBe(companyName);
});


Then("user should see the program name on the page", async function () {
    let actualProgramName = await leftMainPage.programName.textContent();
    await expect (actualProgramName.trim()).toBe(productInfo.programName);

});

Then("user should see the following elements:", async function (options) {
    const expectedElements = options.raw().flat();
    await leftMainPage.verifyFooterElementsInOrder(expectedElements);
});


Then("user should see the following text {string}", async function (expected) {
    const actualText = await startApplicationPage.footer.textContent();
    await expect(actualText.trim()).toBe(expected);
});
       

    