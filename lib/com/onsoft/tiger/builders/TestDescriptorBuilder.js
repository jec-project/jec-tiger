"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TestDescriptor_1 = require("../reflect/TestDescriptor");
class TestDescriptorBuilder {
    constructor() { }
    build(key, descriptor, params) {
        let testDesc = new TestDescriptor_1.TestDescriptor();
        testDesc.description = params.description;
        testDesc.method = key;
        testDesc.repeat = params.repeat || 0;
        testDesc.timeout = params.timeout || -1;
        return testDesc;
    }
}
exports.TestDescriptorBuilder = TestDescriptorBuilder;
;
