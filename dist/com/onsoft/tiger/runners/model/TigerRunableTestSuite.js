"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TestSuiteDescriptorRegistry_1 = require("../../metadata/TestSuiteDescriptorRegistry");
const jec_juta_1 = require("jec-juta");
const TestMethodBuilder_1 = require("../../builders/TestMethodBuilder");
const AnnotatedMethodBuilder_1 = require("../../builders/AnnotatedMethodBuilder");
const jec_juta_2 = require("jec-juta");
const TestSorterUtil_1 = require("../../utils/TestSorterUtil");
class TigerRunableTestSuite {
    constructor() {
        this._testSuite = null;
        this._description = null;
        this._testMethods = null;
        this._annotatedMethods = null;
        this._disabled = false;
        this._testOrder = jec_juta_2.TestSorters.DEFAULT;
        this._instantiationPolicy = jec_juta_2.InstantiationPolicy.SINGLE;
        this._testSorter = null;
        this.initObj();
    }
    initObj() {
        this._testMethods = new Array();
        this._annotatedMethods = new Array();
        this._testSorter = new TestSorterUtil_1.TestSorterUtil();
    }
    initTestMethods() {
        let coll = TestSuiteDescriptorRegistry_1.TestSuiteDescriptorRegistry.getTestDescriptorCollection();
        let len = coll.length;
        let builder = new TestMethodBuilder_1.TestMethodBuilder();
        let method = null;
        let descriptor = null;
        while (len--) {
            descriptor = coll[len];
            method = builder.build(descriptor);
            this._testMethods.push(method);
        }
        this._testSorter.sort(this._testMethods, this._testOrder);
    }
    initAnnotatedMethods() {
        let coll = TestSuiteDescriptorRegistry_1.TestSuiteDescriptorRegistry.getAnnotatedMethodDescriptorCollection();
        let len = coll.length;
        let builder = new AnnotatedMethodBuilder_1.AnnotatedMethodBuilder();
        let method = null;
        let descriptor = null;
        while (len--) {
            descriptor = coll[len];
            method = builder.build(descriptor);
            this._annotatedMethods.push(method);
        }
    }
    initParameters() {
        let map = TestSuiteDescriptorRegistry_1.TestSuiteDescriptorRegistry.getParametersMap();
        this.initAsyncProps(map, this._testMethods);
        this.initAsyncProps(map, this._annotatedMethods);
    }
    initAsyncProps(map, coll) {
        let len = coll.length;
        let method = null;
        while (len--) {
            method = coll[len];
            if (map.has(method.name))
                method.async = true;
        }
    }
    getTestSuite() {
        return this._testSuite;
    }
    setTestSuite(testSuite) {
        let descriptor = TestSuiteDescriptorRegistry_1.TestSuiteDescriptorRegistry.getRegisteredDescriptor();
        if (!descriptor) {
            throw new jec_juta_1.TestSuiteError("No TestSuiteDescriptor is defined for the specified class:" +
                testSuite.constructor.name);
        }
        this._testSuite = testSuite;
        this._description = descriptor.description;
        this._disabled = descriptor.disabled;
        this._testOrder = descriptor.testOrder;
        this._instantiationPolicy = descriptor.instantiationPolicy;
        this.initTestMethods();
        this.initAnnotatedMethods();
        this.initParameters();
    }
    getDescription() {
        return this._description;
    }
    getTestMethods() {
        return this._testMethods;
    }
    getAnnotatedMethods() {
        return this._annotatedMethods;
    }
    isDisabled() {
        return this._disabled;
    }
    getTestOrder() {
        return this._testOrder;
    }
    getInstantiationPolicy() {
        return this._instantiationPolicy;
    }
}
exports.TigerRunableTestSuite = TigerRunableTestSuite;
