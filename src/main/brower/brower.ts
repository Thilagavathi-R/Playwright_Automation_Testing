import { LaunchOptions, chromium, firefox, webkit } from "playwright/test";
import * as testdata from "../testdata/testdata.json";


export default () => {
    const headed = testdata.EnableHeadless === 'True';
    
    const options: LaunchOptions = {
        headless: !headed,
        args: ['--window-size=1920,1040'],
    };

    const browserType = process.env.npm_config_BROWSER || "chrome";

    switch (browserType) {
        case "chrome":
            return chromium.launch(options);
        case "firefox":
            return firefox.launch(options);
        case "webkit":
            return webkit.launch(options);
        default:
            throw new Error("Please set the proper browser!");
    }
};



/*if (ConfigFileReader.getheaded() == 'true') {
    
    const options: LaunchOptions = {
        headless: !true ,
        args:['--window-size=1920,1040'],
        
    }


export  default () =>  {
    const browserType = process.env.npm_config_BROWSER || "chrome";
    switch (browserType) {
        case "chrome":
            return chromium.launch(options);
        case "firefox":
            return firefox.launch(options);
        case "webkit":
            return webkit.launch(options);
        default:
            throw new Error("Please set the proper browser!");
        
    }  

}
};*/


// browser.manage().window().maximize();