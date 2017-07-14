"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jec_juta_1 = require("jec-juta");
class TestSuiteDescriptor {
    constructor() {
        this.description = null;
        this.disabled = false;
        this.testOrder = jec_juta_1.TestSorters.DEFAULT;
        this.instanciationPolicy = jec_juta_1.InstanciationPolicy.SINGLE;
    }
}
exports.TestSuiteDescriptor = TestSuiteDescriptor;
