"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TigerAnnotatedMethod_1 = require("../runners/model/TigerAnnotatedMethod");
class AnnotatedMethodBuilder {
    constructor() { }
    build(descriptor) {
        let method = new TigerAnnotatedMethod_1.TigerAnnotatedMethod();
        method.name = descriptor.method;
        method.type = descriptor.type;
        method.timeout = descriptor.timeout;
        return method;
    }
}
exports.AnnotatedMethodBuilder = AnnotatedMethodBuilder;
;
