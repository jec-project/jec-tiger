"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TigerTestMethod_1 = require("../runners/model/TigerTestMethod");
class TestMethodBuilder {
    constructor() { }
    build(descriptor) {
        const testMethod = new TigerTestMethod_1.TigerTestMethod();
        testMethod.description = descriptor.description;
        testMethod.name = descriptor.method;
        testMethod.timeout = descriptor.timeout;
        testMethod.repeat = descriptor.repeat;
        testMethod.disabled = descriptor.disabled || false;
        testMethod.order = descriptor.order || 0;
        return testMethod;
    }
}
exports.TestMethodBuilder = TestMethodBuilder;
;
