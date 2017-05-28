"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jec_juta_1 = require("jec-juta");
const TestSuiteDescriptorRegistry_1 = require("../../metadata/TestSuiteDescriptorRegistry");
const TestDescriptorBuilder_1 = require("../../builders/TestDescriptorBuilder");
class TestDecorator {
    constructor() { }
    decorate(target, key, descriptor, params) {
        if (!params.description) {
            throw new jec_juta_1.TestSuiteError("Test error: 'description' parameter is missing for test " + key);
        }
        let testSuiteDescriptor = TestSuiteDescriptorRegistry_1.TestSuiteDescriptorRegistry.getRegisteredDescriptor();
        let builder = new TestDescriptorBuilder_1.TestDescriptorBuilder();
        let testDescriptor = builder.build(key, descriptor, params);
        TestSuiteDescriptorRegistry_1.TestSuiteDescriptorRegistry.addTestDescriptor(testDescriptor);
        return target;
    }
}
exports.TestDecorator = TestDecorator;
