import { BrowserUtility } from "../utilities/BrowserUtility.js";
import { BasePage } from "./BasePage.js";
import { expect } from "@playwright/test";

export class ConfirmationPage extends BasePage {
  /**
   * @param {import('playwright').Page} page
   */

  constructor(page) {
    super(page);

    this.confirmationMessage = page.locator("//div[@class='payment-confirmation']/p[@class]");
    this.emailText = page.locator("text=Your receipt will be send to").locator("u");

  }
}
