"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TestSuiteDescriptorRegistry {
    static registerDescriptor(testSuiteDescriptor) {
        TestSuiteDescriptorRegistry._testSuiteDescriptor = testSuiteDescriptor;
        if (testSuiteDescriptor) {
            TestSuiteDescriptorRegistry._testColl = new Array();
            TestSuiteDescriptorRegistry._methodColl =
                new Array();
        }
        else {
            TestSuiteDescriptorRegistry._testColl.splice(0);
            TestSuiteDescriptorRegistry._testColl = null;
            TestSuiteDescriptorRegistry._methodColl.splice(0);
            TestSuiteDescriptorRegistry._methodColl = null;
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
}
TestSuiteDescriptorRegistry._testSuiteDescriptor = null;
TestSuiteDescriptorRegistry._testColl = null;
TestSuiteDescriptorRegistry._methodColl = null;
exports.TestSuiteDescriptorRegistry = TestSuiteDescriptorRegistry;
