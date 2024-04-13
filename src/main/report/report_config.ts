const fs = require("fs-extra");

try {
    fs.emptyDir("test-results");
} catch (error) {
    console.log("Error while emptying directory: " + error);
}
