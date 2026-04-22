import { Given, Then, When } from "@cucumber/cucumber";
import { expect} from "@playwright/test";
import { startApplicationPage, page } from "../../globalPagesSetup.js";
import { productInfo } from "../../utilities/qa-data-reader.js";



Then("the program start date should be displayed", async function () {});

Then("the program refund date should be displayed", async function () {});

Then("the program start date should be accurate according to the program schedule",async function () {});

Then("the program refund date should be accurate according to the program schedule",async function () {});
