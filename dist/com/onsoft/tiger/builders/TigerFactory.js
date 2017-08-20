"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DefaultTigerContainer_1 = require("../core/DefaultTigerContainer");
const SplashScreen_1 = require("../utils/SplashScreen");
class TigerFactory {
    constructor() { }
    create() {
        let tester = new DefaultTigerContainer_1.DefaultTigerContainer();
        let splashScreen = new SplashScreen_1.SplashScreen();
        splashScreen.displayMessage(tester.getVersion());
        return tester;
    }
}
exports.TigerFactory = TigerFactory;
;
