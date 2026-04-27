import { BasePage } from "./BasePage.js";
import { expect } from "@playwright/test";

export class LeftMainPage extends BasePage {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    super(page);

    this.cydeoImageAtLeftWindow = page.locator("(//img[@src = 'assets/images/logo.svg'])[2]");
    this.secureCheckout = page.locator("//p[@class='checkout-title']");
    this.secureCheckOutText = page.locator("(//img[@class='ng-star-inserted' ])[2]");
    this.footerElements = page.locator("//a[contains(@href, 'https://cydeo.com/')]",);
    this.programName = page.locator("//p[@class='course-name']/a");

  }

  async verifyFooterElementsInOrder(expectedElements) {
    const linkTexts = await this.footerElements.allTextContents();
    const actualElements = linkTexts.map((text) => text.trim().toLowerCase());
    const expected = expectedElements.map((text) => text.trim().toLowerCase());

    expect(actualElements).toEqual(expected);
  }
}
