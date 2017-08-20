"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TigerTestableMethod_1 = require("./TigerTestableMethod");
class TigerTestMethod extends TigerTestableMethod_1.TigerTestableMethod {
    constructor() {
        super();
        this.description = null;
        this.repeat = 0;
        this.order = 0;
    }
}
exports.TigerTestMethod = TigerTestMethod;
