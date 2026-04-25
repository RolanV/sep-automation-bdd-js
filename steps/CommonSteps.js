import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import {
  startApplicationPage,
  leftMainPage,
  paymentPlanPage,
  reviewPaymentPage,
  page,
} from "../globalPagesSetup.js";
import { fa, faker } from "@faker-js/faker";


Given("user is on the enrollment page", async function () {
  await startApplicationPage.login();
});

Given("user completed the start application step", async function () {
  await startApplicationPage.enterFirstName(faker.person.firstName());
  await startApplicationPage.enterLastName(faker.person.lastName());
  await startApplicationPage.enterEmail(faker.internet.email());
  await startApplicationPage.enterPhoneNumber(faker.string.numeric(10));
  await startApplicationPage.selectHowDidYouHearAboutUs("linkedin");
  await startApplicationPage.clickNextButton();
  // await page.waitForTimeout(5000);
});

