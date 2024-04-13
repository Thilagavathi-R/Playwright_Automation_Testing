import { BeforeAll, AfterAll, Before, After, Status } from "@cucumber/cucumber";
import { Browser, BrowserContext, Page } from "playwright/test";
import { fixture } from "../hooks/Pagefixture";
import {options} from "../hooks/until/logger"
const fs = require("fs-extra");

let browser: Browser;
let context: BrowserContext;
let Page : Page;
let videoPath: string | null = null;

BeforeAll (async function () {
    
    browser = await invokeBrowser();
   
})

Before({ tags: "not @auth" }, async function ({ pickle }) {

    const scenarioName = pickle.name + pickle.id
    context = await browser.newContext({
        recordVideo: {
            dir: "test-results/videos",
        },
    });
    await context.tracing.start({
        name: scenarioName,
        title: pickle.name,
        sources: true,
        screenshots: true, snapshots: true
    });
    const page = await context.newPage()
    fixture.page = page;
    fixture.logger = createLogger(options(scenarioName));
});


// It will trigger for auth scenarios
Before({ tags: '@auth' }, async function ({ pickle }) {
    const scenarioName = pickle.name + pickle.id
    context = await browser.newContext({
        // storageState: getStorageState(pickle.name),
        recordVideo: {
            dir: "test-results/videos",
        },
    });
    await context.tracing.start({
        name: scenarioName,
        title: pickle.name,
        sources: true,
        screenshots: true, snapshots: true
    });
    const page = await context.newPage();
    fixture.page = page;
    fixture.logger = createLogger(options(scenarioName));
});

After (async function ({pickle, result}) {
    
    // let videoPath: string;
    let img: Buffer;
    const path = `./test-results/trace/${pickle.id}.zip`;
    let videoPath: string | null = null;
    let videoObject = fixture.page.video();
    if (result?.status == Status.PASSED) {
        img = await fixture.page.screenshot(
            { path: `./test-results/screenshots/${pickle.name}.png`, type: "png" })           
        
        if (videoObject == null) {
            console.log('Video not available')
        } else {
            videoPath = await videoObject.path()
        }
        
    }else {
        img = await fixture.page.screenshot(
            { path: `./test-results/screenshots/${pickle.name}.png`, type: "png" })
            if (videoObject == null) {
                console.log('Video not available')
            } else {
                videoPath = await videoObject.path()
            }
    }

    await context.tracing.stop({ path: path });
    // await fixture.page.close();
    // await context.close();
    if (result?.status == Status.PASSED) {
         await this.attach(
            img, "image/png"
        );
            if(videoPath != null){
              await this.attach(
                    fs.readFileSync(videoPath),
                    'video/webm'
                );
            }
        const traceFileLink = `<a href="https://trace.playwright.dev/">Open ${path}</a>`
         this.attach(`Trace file: ${traceFileLink}`, 'text/html');

    }else{
        await this.attach(
            img, "image/png"
        );
        if(videoPath != null){
            await this.attach(
                fs.readFileSync(videoPath),
                'video/webm'
            );
        }
        const traceFileLink = `<a href="https://trace.playwright.dev/">Open ${path}</a>`
         this.attach(`Trace file: ${traceFileLink}`, 'text/html');

    }
});
        

AfterAll(async function () {
    // await browser.close();
    // await fixture.page.close();
    // fixture.logger.close();
});


function createLogger(arg0: { transports: any[]; }): import("playwright-core").Logger {
    throw new Error("Function not implemented.");
}

function invokeBrowser(): Browser | PromiseLike<Browser> {
    throw new Error("Function not implemented.");
}
/*function getStorageState(user: string): string | { cookies: { name: string; value: string; domain: string; path: string; expires: number; httpOnly: boolean; secure: boolean; sameSite: "Strict" | "Lax" | "None"; }[]; origins: { origin: string; localStorage: { name: string; value: string; }[]; }[]; } {
    if (user.endsWith("admin"))
        return "src/helper/auth/admin.json";
    else if (user.endsWith("lead"))
        return "src/helper/auth/lead.json";
}*/
