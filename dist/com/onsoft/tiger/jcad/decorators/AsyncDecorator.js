"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jec_juta_1 = require("jec-juta");
const ParameterDescriptorBuilder_1 = require("../../builders/ParameterDescriptorBuilder");
const ParametersMapUtil_1 = require("../../utils/ParametersMapUtil");
class AsyncDecorator {
    constructor() { }
    decorate(target, propertyKey, parameterIndex) {
        const methodName = propertyKey.toString();
        const builder = new ParameterDescriptorBuilder_1.ParameterDescriptorBuilder();
        const descriptor = builder.build(methodName, jec_juta_1.JutaConnectorRefs.ASYNC_CONNECTOR_REF, parameterIndex);
        ParametersMapUtil_1.ParametersMapUtil.getParameterCollection(methodName).push(descriptor);
        return target;
    }
}
exports.AsyncDecorator = AsyncDecorator;
