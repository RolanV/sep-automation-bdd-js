import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import {
  startApplicationPage,
  leftMainPage,
  page,
} from "../../globalPagesSetup.js";
import { productInfo } from "../../utilities/qa-data-reader.js";

Then(
  "user should see the product name on the information card",
  async function () {
    await expect(startApplicationPage.programNameOnInfoCard).toBeVisible();
  },
);

Then(
  "user should see that the product name on the information card matches the product name on the left side of the screen",
  async function () {
    const infoCardName = (
      await startApplicationPage.programNameOnInfoCard.textContent()
    ).trim();
    const leftSideName = (await leftMainPage.programName.textContent()).trim();

    expect(infoCardName).toBe(leftSideName);
  },
);

Then(
  "user should see the price of the product displayed on the information card",
  async function () {
    await expect(startApplicationPage.programPrice).toBeVisible();
  },
);

Then(
  "user should see the text indicating a flexible payment plan displayed on the information card",
  async function () {
    await expect(
      startApplicationPage.flexiblePaymentsPlanAvailableText,
    ).toBeVisible();
  },
);

Then(
  "user should see the program start date displayed on the information card",
  async function () {
    await expect(startApplicationPage.programStartDate).toBeVisible();
  },
);

Then(
  "user should see the return policy and the final date for returns displayed on the information card",
  async function () {
    await expect(startApplicationPage.refundEndDate).toBeVisible();
  },
);
