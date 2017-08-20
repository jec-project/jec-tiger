"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TestableMethodDescriptor_1 = require("./TestableMethodDescriptor");
class AnnotatedMethodDescriptor extends TestableMethodDescriptor_1.TestableMethodDescriptor {
    constructor() {
        super();
        this.type = -1;
    }
}
exports.AnnotatedMethodDescriptor = AnnotatedMethodDescriptor;
