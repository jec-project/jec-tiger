"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TestableMethodDescriptor_1 = require("./TestableMethodDescriptor");
class TestDescriptor extends TestableMethodDescriptor_1.TestableMethodDescriptor {
    constructor() {
        super();
        this.description = null;
        this.repeat = 0;
        this.order = 0;
    }
}
exports.TestDescriptor = TestDescriptor;
