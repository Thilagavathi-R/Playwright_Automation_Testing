import { browser, ElementFinder, ProtractorExpectedConditions } from "protractor";
import { protractor } from "protractor/built/ptor";
import { ElementHandle, Locator, Page, expect } from "playwright/test";

import { fixture } from "../hooks/Pagefixture";
// import JR_Objects from "../Locater/JR_Objects";


export class common_methods {
    page: Page;
   
    constructor(page: Page) {
        this.page = page;
    }

    static ec: ProtractorExpectedConditions = protractor.ExpectedConditions;
    static timeOut = 10000;
 
    /**
     * @description This function is used to do the click action
     * @param element - The element on whick click action to be performed
     */

    static async click(element: Locator ) {
        await element.isEnabled()
        await element.click();
    }
    /**
     * @description This function will append the text
     * @param element Pass the element locator
     * @param testData Data to be typed on the element
     */
    static async type(element: Locator, testData: string) {
        await element.isEnabled()
        await element.fill(testData);
    }


    /**
    * @description This function will clear the existing value and then type the data
    * @param element Pass the element locator
    * @param testData Data to be typed on the element
    */

   static async clearAndType(element: ElementFinder, testData: string) {
        await this.visibilityOf(element);
        await element.clear()
        await element.sendKeys(testData);
    }

    static async assertText(element: ElementFinder, expectedText: string) {
        await this.visibilityOf(element);
        let actualText = await element.getText();
        expect(actualText.trim()).toBe(expectedText);
    }

    static async visibilityOf(element: ElementFinder) {
        await browser.wait(this.ec.visibilityOf(element), this.timeOut,
            "Element is not visible");
    }

    static async inVisibilityOf(element: ElementFinder) {
        await browser.wait(this.ec.invisibilityOf(element), this.timeOut,
            "Element is still visible");
    }
    static async assertTrue(element: ElementFinder) {
        await this.visibilityOf(element);
        expect(await element.isDisplayed()).toBe(true);
    }

    static async assertFalse(element: ElementFinder) {
        await this.visibilityOf(element);
        expect(await element.isDisplayed()).toBe(false);
    }

    static async acceptAlert() {
        await browser.wait(this.ec.alertIsPresent(), this.timeOut, "Alert is not present");
        await (await browser.switchTo().alert()).accept();
    }

    static async dismissAlert() {
        await this.waitForAlert();
        await (await browser.switchTo().alert()).dismiss();
    }

    static async waitForAlert() {
        await browser.wait(this.ec.alertIsPresent(), this.timeOut, "Alert is not present");
    }

    static async tyepInAlert(data: string) {
        await this.waitForAlert();
        await (await browser.switchTo().alert()).sendKeys(data);
    }
    static async getTextFromAlert(): Promise<string> {
        await this.waitForAlert();
        let alertText = await (await browser.switchTo().alert()).getText();
        return alertText;
    }

    public async switchToFrame(frameNumber: number) {
        await browser.switchTo().frame(frameNumber);
    }


    static async typeAndTab(element: ElementFinder, testData: string) {
        await this.visibilityOf(element);
        await element.clear();
        await element.sendKeys(testData, protractor.Key.TAB)
    }

    static async typeAndEnter(element: ElementFinder, testData: string) {
        let capabilities = await browser.getCapabilities()
        let platform = capabilities.get('platform');
        await this.visibilityOf(element);
        await element.clear();
        if (platform === "Mac OS X") {
            await element.sendKeys(testData, protractor.Key.RETURN)
        } else {
            await element.sendKeys(testData, protractor.Key.ENTER)
        }
    }

    static async mouseHoverAndClick(element: ElementFinder) {
        await browser.actions()
            .mouseMove(await element.getWebElement())
            .click()
            .perform();

    }
    static async moveToElement(element: ElementFinder) {
        await browser.actions()
            .mouseMove(await element.getWebElement())
            .perform();
    }
    async selectByIndex(locator: string, index: number) {
        const dropdown = await this.page.locator(locator);
        await dropdown.click();
        await this.page.waitForSelector('.mat-option');
        const options = await this.page.$$('.mat-option');
        if (index >= 0 && index < options.length) {

            const selectedOption = options[index];
            const selectedOptionText = await selectedOption.innerText();
            await selectedOption.click();
            console.log(`Selected option: ${selectedOptionText}`);

        }
    }

}
