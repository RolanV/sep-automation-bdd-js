import { BasePage } from "./BasePage.js";
import { expect } from "@playwright/test";

export class StartApplicationPage extends BasePage {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    super(page);

    this.startApplicationText = page.locator(
      "(//div[@class = 'step-title'])[1]",
    );

    this.paymentPlanText = page.locator("(//div[@class = 'step-title'])[2]");

    this.reviewText = page.locator("(//div[@class = 'step-title'])[3]");

    this.startApplicationStepCircle = page.locator(
      "(//*[@class='step-circle'])[1]",
    );

    this.paymentPlanStepCircle = page.locator("(//*[@class='step-circle'])[2]");

    this.reviewStepCircle = page.locator("(//*[@class='step-circle'])[3]");

    this.firstNameInputBox = page.locator(
      "//input[@formcontrolname='firstName']",
    );

    this.lastNameInputBox = page.locator(
      "//input[@formcontrolname='lastName']",
    );

    this.emailInputBox = page.locator("//input[@formcontrolname='email']");

    this.phoneNumberInputBox = page.locator(
      "//input[@formcontrolname='phoneNumber']",
    );

    this.howDidYouHearAboutUsDropDown = page.locator(
      "//mat-label[text()='How did you hear about us?']",
    );


    this.emailOptionFromDropDown = page.locator(
      "//mat-option/span[contains(text(), 'Email')]",
    );

    this.facebookOptionFromDropDown = page.locator(
      "//mat-option/span[contains(text(), 'Facebook')]",
    );

    this.googleOption = page.locator(
      "//mat-option/span[contains(text(), 'Google')]",
    );

    this.instagramOptionFromDropDown = page.locator(
      "//mat-option/span[contains(text(), 'Instagram')]",
    );

    this.linkedInOptionFromDropDown = page.locator(
      "//mat-option/span[contains(text(), 'LinkedIN')]",
    );

    this.twitterOptionFromDropDown = page.locator(
      "//mat-option/span[contains(text(), 'Twitter')]",
    );

    this.referredByFriedOptionFromDropDown = page.locator(
      "//mat-option/span[contains(text(), 'Referred by a friend')]",
    );

    this.otherOptionFromDropDown = page.locator(
      "//mat-option/span[contains(text(), 'Other')]",
    );

    this.firstNameInputBoxForParents = page.locator(
      "(//input[@formcontrolname='firstName'])[2]",
    );

    this.lastNameInputBoxForParents = page.locator(
      "(//input[@formcontrolname='lastName'])[2]",
    );

    this.emailInputBoxForParents = page.locator(
      "(//input[@formcontrolname='email'])[2]",
    );

    this.phoneNumberInputBoxForParents = page.locator(
      "(//input[@formcontrolname='phoneNumber'])[2]",
    );

    this.flexiblePaymentsPlanAvailableText = page.locator(
      "//p[text() = 'Flexible payments plan available']",
    );

    this.programStartDate = page.locator(
      "//div[contains(text(), 'Program Start Date')]/b[@class='info-value']",
    );

    this.refundEndDate = page.locator("(//b[@class='info-value'])[2]");

    this.programNameOnInfoCard = page.locator(
      "//p[@class='program-title primary-color']",
    );

    this.programPrice = page.locator(
      "//div[@class='col-sm']/b[@class = 'info-primary']",
    );

    this.footer = page.locator(
      "//p[@class = 'footer-text' and contains(text(), 'Need help?')]",
    );

    this.nextButton = page.locator(
      "//button[@class = 'next-button'][contains(text(), 'Next')]",
    );

    this.programBasePrice = page.locator("//span[@class='ng-star-inserted']/s");

    this.enterPersonalDetails = page.locator(
      "//b[contains(.,'Enter personal details')]",
    );

    this.discountedPrice = page.locator("//b[@class='info-primary']");

    this.originalPrice = page.locator("//s[contains(.,'$')]");

    this.startApplicationStepCircleText = page.locator(
      "//div[.='Start Application']",
    );
    this.paymentPlanStepCircleText = page.locator("//div[.='Payment plan']");
    this.reviewStepCircleText = page.locator("//div[.='Review']");

    this.phoneNumberInputBox_VerificationColor = page.locator('[formcontrolname="phoneNumber"]');
  }

  /**
   * @param {string} firstName
   */
  async enterFirstName(firstName) {
    await this.firstNameInputBox.fill(firstName);
  }

  /**
   * @param {string} lastName
   */
  async enterLastName(lastName) {
    await this.lastNameInputBox.fill(lastName);
  }

  /**
   * @param {string} email
   */
  async enterEmail(email) {
    await this.emailInputBox.fill(email);
  }

  /**
   * @param {string} phoneNumber
   */
  async enterPhoneNumber(phoneNumber) {
    await this.phoneNumberInputBox.fill(phoneNumber);
  }

  /**
   * @param {string} howDidYouHear
   */
  async selectHowDidYouHearAboutUs(howDidYouHear) {
    howDidYouHear = howDidYouHear.toLowerCase();
    await this.howDidYouHearAboutUsDropDown.click();
    switch (howDidYouHear) {
      case "email":
        await this.emailOptionFromDropDown.click();
        break;
      case "facebook":
        await this.facebookOptionFromDropDown.click();
        break;
      case "google":
        await this.googleOption.click();
        break;
      case "instagram":
        await this.instagramOptionFromDropDown.click();
        break;
      case "linkedin":
        await this.linkedInOptionFromDropDown.click();
        break;
      case "twitter":
        await this.twitterOptionFromDropDown.click();
        break;
    }
  }

  async clickNextButton() {
    await this.nextButton.click();
  }

  /**
   * @param {string} stepper  // step1, step2, step3
   * @param {string} color    // blue, green, grey
   * @param {string} cssProperty //border-top-color, background-color (default)
   */
  
  async verifyStepperColor(stepper, color, cssProperty = "background-color") {
    // Step mapping
    const steps = {
      step1: this.startApplicationStepCircle,
      step2: this.paymentPlanStepCircle,
      step3: this.reviewStepCircle,
    };

    // Color mapping
    const colors = {
      blue: "rgb(1, 201, 255)",
      green: "rgb(172, 245, 138)",
      grey: "rgb(217, 226, 236)",
    };

    const stepKey = stepper.toLowerCase().trim();
    const colorKey = color.toLowerCase().trim();

    // validation (very important in real frameworks)
    if (!steps[stepKey]) {
      throw new Error(`Invalid step: ${stepper}`);
    }

    if (!colors[colorKey]) {
      throw new Error(`Invalid color: ${color}`);
    }

    // Assertion
    await expect(steps[stepKey]).toHaveCSS(cssProperty, colors[colorKey]);
  }
}
