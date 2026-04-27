import { Given, Then, When } from "@cucumber/cucumber";
import { expect} from "@playwright/test";
import { startApplicationPage, page } from "../../globalPagesSetup.js";
import { productInfo } from "../../utilities/qa-data-reader.js";
import { fa, faker } from "@faker-js/faker";


When("user fills in all the fields with valid information", async function () {
    await startApplicationPage.enterFirstName(faker.person.firstName());
    await startApplicationPage.enterLastName(faker.person.lastName());
    await startApplicationPage.enterEmail(faker.internet.email());
    await startApplicationPage.enterPhoneNumber(faker.string.numeric(10));
    await startApplicationPage.selectHowDidYouHearAboutUs("linkedin");
});


When("user clicks on the next button", async function () {
    await startApplicationPage.clickNextButton();
});


When("user fills in only the required fields with valid information",async function () {
     await startApplicationPage.enterFirstName(faker.person.firstName());
     await startApplicationPage.enterLastName(faker.person.lastName());
     await startApplicationPage.enterEmail(faker.internet.email());
     await startApplicationPage.enterPhoneNumber(faker.string.numeric(10));
});


Then("user should be navigated to payment plan section and see the payment plan stepper is {string}",async function (color) {
    await startApplicationPage.verifyStepperColor("step2",color);
});


