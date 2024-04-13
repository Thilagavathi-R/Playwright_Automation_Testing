import { userInfo } from "os";
// import { generate } from "multiple-cucumber-html-reporter";
// import { browser } from "protractor";

generate({
    jsonDir: "test-results",
    reportPath: "test-results/reports/",
    reportName: "Playwright Automation Report",
    pageTitle: "Internship Automation",
    displayDuration: true,
    metadata: {
        browser: {
            name: "chromium",
            version: "122",
        },
        device: userInfo(), // Call userInfo() function to get user information
        platform: {
            name: "Windows",
            version: "11",
        },
    },
    customData: {
        title: "Test Info",
        data: [
            { label: "Project", value: "EIP4 EPM" },
            { label: "Release", value: "1" },
            { label: "Cycle", value: "Smoke" }
        ],
    },
});
function generate(arg0: {
    jsonDir: string; reportPath: string; reportName: string; pageTitle: string; displayDuration: boolean; metadata: {
        browser: { name: string; version: string; }; device: import("os").UserInfo<string>; // Call userInfo() function to get user information
        platform: { name: string; version: string; };
    }; customData: { title: string; data: { label: string; value: string; }[]; };
}) {
    throw new Error("Function not implemented.");
}

