"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jec_juta_1 = require("jec-juta");
const TestSuiteDescriptorRegistry_1 = require("../../metadata/TestSuiteDescriptorRegistry");
class TestSuiteDecorator {
    constructor() { }
    decorate(target, params) {
        let descriptor = TestSuiteDescriptorRegistry_1.TestSuiteDescriptorRegistry.getRegisteredDescriptor();
        if (!params.description) {
            throw new jec_juta_1.TestSuiteError("TestSuite error: 'description' parameter is missing for test suite " +
                target);
        }
        descriptor.description = params.description;
        descriptor.disabled = params.disabled || false;
        descriptor.testOrder = params.testOrder || jec_juta_1.TestSorters.DEFAULT;
        return target;
    }
}
exports.TestSuiteDecorator = TestSuiteDecorator;
