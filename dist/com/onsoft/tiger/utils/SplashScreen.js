"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const printMessage = require("print-message");
class SplashScreen {
    constructor() { }
    displayMessage(version) {
        printMessage([
            "  Tiger Unit Testing Framework ",
            "  ----------------------------",
            `            V. ${version}            `,
            "    (C) 2017 - ONSOFT SYSTEMS    ",
            "       All Rights Reserved       "
        ]);
    }
}
exports.SplashScreen = SplashScreen;
;
