"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TestSuiteDescriptorRegistry_1 = require("../metadata/TestSuiteDescriptorRegistry");
class ParametersMapUtil {
    constructor() { }
    static getParameterCollection(methodName) {
        const map = TestSuiteDescriptorRegistry_1.TestSuiteDescriptorRegistry.getParametersMap();
        let result = null;
        if (map.has(methodName)) {
            result = map.get(methodName);
        }
        else {
            result = new Array();
            map.set(methodName, result);
        }
        return result;
    }
}
exports.ParametersMapUtil = ParametersMapUtil;
;
