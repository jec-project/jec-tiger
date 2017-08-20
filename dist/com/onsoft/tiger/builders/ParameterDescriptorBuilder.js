"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ParameterDescriptor_1 = require("../reflect/ParameterDescriptor");
class ParameterDescriptorBuilder {
    constructor() { }
    build(methodName, connectorRef, parameterIndex) {
        let paramDesc = new ParameterDescriptor_1.ParameterDescriptor();
        paramDesc.connectorRef = connectorRef;
        paramDesc.index = parameterIndex;
        paramDesc.methodName = methodName;
        return paramDesc;
    }
}
exports.ParameterDescriptorBuilder = ParameterDescriptorBuilder;
;
