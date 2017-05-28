"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AnnotatedMethodDescriptor_1 = require("../reflect/AnnotatedMethodDescriptor");
class AnnotatedMethodDescriptorBuilder {
    constructor() { }
    build(key, descriptor, type, params) {
        let desc = new AnnotatedMethodDescriptor_1.AnnotatedMethodDescriptor();
        desc.method = key;
        desc.type = type;
        if (params) {
            desc.timeout = params.timeout;
        }
        return desc;
    }
}
exports.AnnotatedMethodDescriptorBuilder = AnnotatedMethodDescriptorBuilder;
;
