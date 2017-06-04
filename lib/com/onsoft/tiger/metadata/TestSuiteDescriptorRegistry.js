"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TestSuiteDescriptorRegistry {
    static registerDescriptor(testSuiteDescriptor) {
        TestSuiteDescriptorRegistry._testSuiteDescriptor = testSuiteDescriptor;
        if (testSuiteDescriptor) {
            TestSuiteDescriptorRegistry._testColl = new Array();
            TestSuiteDescriptorRegistry._methodColl =
                new Array();
            TestSuiteDescriptorRegistry._parametersMap =
                new Map();
        }
        else {
            TestSuiteDescriptorRegistry._testColl.splice(0);
            TestSuiteDescriptorRegistry._testColl = null;
            TestSuiteDescriptorRegistry._methodColl.splice(0);
            TestSuiteDescriptorRegistry._methodColl = null;
            TestSuiteDescriptorRegistry._parametersMap.clear();
            TestSuiteDescriptorRegistry._parametersMap = null;
        }
        return testSuiteDescriptor;
    }
    static getRegisteredDescriptor() {
        return TestSuiteDescriptorRegistry._testSuiteDescriptor;
    }
    static getTestDescriptorCollection() {
        return TestSuiteDescriptorRegistry._testColl;
    }
    static addTestDescriptor(testDescriptor) {
        TestSuiteDescriptorRegistry._testColl.push(testDescriptor);
    }
    static getAnnotatedMethodDescriptorCollection() {
        return TestSuiteDescriptorRegistry._methodColl;
    }
    static addAnnotatedMethodDescriptor(methodDescriptor) {
        TestSuiteDescriptorRegistry._methodColl.push(methodDescriptor);
    }
    static getParametersMap() {
        return TestSuiteDescriptorRegistry._parametersMap;
    }
}
TestSuiteDescriptorRegistry._testSuiteDescriptor = null;
TestSuiteDescriptorRegistry._testColl = null;
TestSuiteDescriptorRegistry._methodColl = null;
TestSuiteDescriptorRegistry._parametersMap = null;
exports.TestSuiteDescriptorRegistry = TestSuiteDescriptorRegistry;
