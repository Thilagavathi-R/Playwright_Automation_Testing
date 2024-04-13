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

    async selectByText(locator: string, Text: string) {
        const dropdown = this.page.locator(locator);
        await dropdown.waitFor({ state: 'visible' });
        await dropdown.click();
        await this.page.fill(locator, Text);
        const optionSelector = `.mat-option:has-text("${Text}")`;
        await this.page.waitForSelector(optionSelector);
        const options = await this.page.$$(optionSelector);
        for (const option of options) {
            const optionText = await option.innerText();
            if (optionText.includes(Text)) {
                const selectedOptionText = await option.innerText();
                await option.click();
                console.log(`Selected option: ${selectedOptionText}`);
                return;
            }
        }

        console.error(`No option with partial text "${Text}" found in the dropdown.`);
    }

    async selectRandomOption(locator: string) {
        const dropdown = await this.page.locator(locator);
        await dropdown.click();
        await this.page.waitForSelector('.mat-option');
        const options = await this.page.$$('.mat-option');

        if (options.length > 0) {
            const randomIndex = Math.floor(Math.random() * options.length);
            const selectedOption = options[randomIndex];
            const selectedOptionText = await selectedOption.innerText();
            await selectedOption.click();
            console.log(`Selected option: ${selectedOptionText}`);

        }
    }
    async getText(locator: string): Promise<string | null> {
        await this.page.waitForSelector(locator);
        const element = await this.page.$(locator);
        const textContent = await element?.textContent();
        return textContent || null;
    }


// Added thilagavathi

    public static async ChooseOption(){
        const options = await fixture.page.$$('//mat-option');
        if (options.length > 0) {
            const randomIndex = Math.floor(Math.random() * options.length);
            const selectedOptionText = await options[randomIndex].innerText();
            console.log(" Selected Option: " + selectedOptionText);
            await options[randomIndex].click();
            await fixture.page.waitForTimeout(1000);
        }
        
    }




    public static async doc1_Details_Print() {
        await fixture.page.waitForTimeout(3000); // Equivalent to Thread.sleep(3000) in Java
        const Doc1_Text = await fixture.page.$$("//div/div[1]/table/tbody/tr[1]/td");
        if (Doc1_Text.length > 0) {
            const randnMumber = Math.floor(Math.random() * Doc1_Text.length);
            console.log(randnMumber);
            for (let i = 0; i < Doc1_Text.length; i++) {
                // await fixture.page.waitForTimeout(1000); // Equivalent to Thread.sleep(1000) in Java
                const textElement = await Doc1_Text[i].innerText();
                console.log(`* ${textElement}\n`);
            }
        }

    }
    public static async Job_Print() {
        await fixture.page.waitForTimeout(3000);
        const Doc1_Text2 = await fixture.page.$$("//mat-option[@role='option']");
        if (Doc1_Text2.length > 0) {
            const randnMumber = Math.floor(Math.random() * Doc1_Text2.length);
            console.log(randnMumber);
            for (let i = 0; i < Doc1_Text2.length; i++) {
                // await fixture.page.waitForTimeout(1000); // Equivalent to Thread.sleep(1000) in Java
                const textElement = await Doc1_Text2[i].innerText();
                console.log(`* ${textElement}\n`);
        }
    }


}
    public static async field_Print() {
        await fixture.page.waitForTimeout(3000); 
        const Doc1_Text1= await fixture.page.$$("//kendo-grid/div/kendo-grid-list/div/div[1]/table/tbody/tr/td");
        if (Doc1_Text1.length > 0) {
            const randnMumber = Math.floor(Math.random() * Doc1_Text1.length);
            console.log(randnMumber);
            for (let i = 0; i < Doc1_Text1.length; i++) {
                //  await fixture.page.waitForTimeout(1000); // Equivalent to Thread.sleep(1000) in Java
                 const textElement = await Doc1_Text1[i].innerText();
                 console.log(`* ${textElement}\n`);
             }
        }
    }
    public static async Filter_Print() {
        await fixture.page.waitForTimeout(3000);
    const Filter = await fixture.page.$$("//div/kendo-grid-list/div/div[1]/table/tbody/tr[1]/td");
    if (Filter.length > 0) {
        const randnMumber = Math.floor(Math.random() * Filter.length);
        console.log(randnMumber);

        for (let i = 0; i < Filter.length; i++) {
            // await fixture.page.waitForTimeout(1000); // Equivalent to Thread.sleep(1000) in Java
            const textElement = await Filter[i].innerText();
            console.log(`* ${textElement}\n`);
        }
    }
    }

    public static async doc2_Details_Print() {
        await fixture.page.waitForTimeout(3000);
    const details = await fixture.page.$$("//table/tbody/tr[2]/td[2]/kendo-grid/div/kendo-grid-list/div/div[1]/table/tbody/tr");
    if (details.length > 0) {
        const randnMumber = Math.floor(Math.random() * details.length);
        console.log(randnMumber);

        for (let i = 0; i < details.length; i++) {
            // await fixture.page.waitForTimeout(1000); // Equivalent to Thread.sleep(1000) in Java
            const textElement = await details[i].innerText();
            console.log(`* ${textElement}\n`);
        }
    }
}



public static async Details_Print() {
    await fixture.page.waitForTimeout(3000);
const details = await fixture.page.$$("//div/div[3]/div/kendo-grid/div/kendo-grid-list/div/div[1]/table/tbody/tr/td");
if (details.length > 0) {
    const randnMumber = Math.floor(Math.random() * details.length);
    console.log(randnMumber);

    for (let i = 0; i < details.length; i++) {
        // await fixture.page.waitForTimeout(1000); // Equivalent to Thread.sleep(1000) in Java
        const textElement = await details[i].innerText();
        console.log(`* ${textElement}\n`);
    }
}
}

public static async Print_values() {
    await fixture.page.waitForTimeout(3000);
const details = await fixture.page.$$("//kendo-grid-list/div/div[1]/table/tbody/tr[1]/td");
if (details.length > 0) {
    const randnMumber = Math.floor(Math.random() * details.length);
    console.log(randnMumber);

    for (let i = 0; i < details.length; i++) {
        // await fixture.page.waitForTimeout(1000); // Equivalent to Thread.sleep(1000) in Java
        const textElement = await details[i].innerText();
        console.log(`* ${textElement}\n`);
    }
}
}


public static async Search_values_print() {
    await fixture.page.waitForTimeout(3000);
const details = await fixture.page.$$("//kendo-grid-list/div/div[1]/table/tbody/tr");
if (details.length > 0) {
    const randnMumber = Math.floor(Math.random() * details.length);
    console.log(randnMumber);

    for (let i = 0; i < details.length; i++) {
        // await fixture.page.waitForTimeout(1000); // Equivalent to Thread.sleep(1000) in Java
        const textElement = await details[i].innerText();
        console.log(`* ${textElement}\n`);
    }
}
}

    public static async getValue_Choose(data: string){
        const listofValues: ElementHandle<Element>[] =await fixture.page.$$('//mat-option'); 
        for (const webElement of listofValues) {
            await fixture.page.waitForTimeout(3000); // Equivalent to Thread.sleep(3000) in Java
            const text = await webElement.innerText();
            console.log("List of Sub Risk is = " + text);
            await fixture.page.waitForTimeout(2000); // Equivalent to Thread.sleep(2000) in Java
            if (text.includes(data)) {
                console.log("Selected Sub Risk is :" + text);
                await webElement.click();
                break;
            } else {
                console.log("Above Mentioned Sub Risk is not " + data);
            }
        }
    }
    
    
// public static async RandomInputFromOption(){
//     async function RandomText(String: selectedOptionText): string {
//     const options1 = await fixture.page.$$('//div[2]/div/div/div/div/kendo-grid/div/kendo-grid-list/div/div[1]/table/tbody/tr/td[2]');
//     if (options1.length > 0) {
//         const randomIndex = Math.floor(Math.random() * options1.length);
//         console.log(" List of Option count: " + options1.length);
//         const selectedOptionText = await options1[randomIndex].innerText();
//         console.log(" Selected Option: " + selectedOptionText);
//         await fixture.page.waitForTimeout(1000);
//         return selectedOptionText;
//     }
//  const textRandom=RandomText()
// } }

    public static RandomLetter(){
        function generateRandomLetters(count: number): string {
            let result = '';
            for (let i = 0; i < count; i++) {
                const randomCharCode = 'A'.charCodeAt(0) + Math.floor(Math.random() * 26);
                const randomLetter = String.fromCharCode(randomCharCode);
                result += randomLetter;
            }
            return result;
        }
        const numberOfLetters = 5; // Change this to the number of letters you want
        const randomLetters = generateRandomLetters(numberOfLetters);
        console.log(randomLetters); // Output: e.g., "abcde" or "xyz"
        return randomLetters;
    }

// public static async submit_Btn_Check(){
//     const submit_Disabled=await fixture.page.$$(PageObjects.Mandatory_fields.submit_Disabled)
//     if(submit_Disabled.length>0){
// console.log("submit button is Disabled")
//     }else{
//         await fixture.page.click(PageObjects.planning.Submit);
//         console.log("submit button is enabled")
//     }
// }

public static async getListTexts() {
    const options = await fixture.page.$$('//mat-option');
    console.log("Number of Options:", options.length);
    for (const option of options) {
        const text = await option.textContent();
        console.log("*", text);
    }
}



public static async uploadFile(selector: string, filePath: string) {
    const element = await fixture.page.$(selector);
    if (element) {
        await element.setInputFiles(filePath);

        console.error(`Element with selector '${selector}' is available`);
    } else {
        console.error(`Element with selector '${selector}' not found`);
    }
}


}