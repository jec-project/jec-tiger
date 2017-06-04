"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jec_juta_1 = require("jec-juta");
const TigerLoggerProxy_1 = require("../logging/TigerLoggerProxy");
const AnnotatedMethodsMapper_1 = require("../utils/AnnotatedMethodsMapper");
require("mocha");
class TigerTestRunner {
    constructor() { }
    sendMessage(message, logLevel) {
        TigerLoggerProxy_1.TigerLoggerProxy.getInstance().log(message, logLevel);
    }
    applyTestMethod(method, testSuiteObj, scope) {
        if (method.disabled) {
            it(`disabled test: ${method.name}`);
            return;
        }
        let timeout = method.timeout;
        if (timeout && timeout > 0)
            scope.timeout(timeout);
        if (method.async) {
            it(method.description, (done) => {
                testSuiteObj[method.name](done);
            });
        }
        else {
            it(method.description, () => {
                testSuiteObj[method.name]();
            });
        }
    }
    applyAnnotatedMethod(method, testSuiteObj, scope) {
        let timeout = -1;
        let methodRef = null;
        if (method) {
            if (method.disabled) {
                it(`disabled config method: ${method.name}`);
                return;
            }
            timeout = method.timeout;
            if (timeout && timeout > 0)
                scope.timeout(timeout);
            switch (method.type) {
                case jec_juta_1.AnnotatedMethodType.BEFORE_CLASS:
                    methodRef = before;
                    break;
                case jec_juta_1.AnnotatedMethodType.AFTER_CLASS:
                    methodRef = after;
                    break;
                case jec_juta_1.AnnotatedMethodType.BEFORE:
                    methodRef = beforeEach;
                    break;
                case jec_juta_1.AnnotatedMethodType.AFTER:
                    methodRef = afterEach;
                    break;
            }
            if (method.async) {
                methodRef((done) => {
                    testSuiteObj[method.name](done);
                });
            }
            else {
                methodRef(() => {
                    testSuiteObj[method.name]();
                });
            }
        }
    }
    runTest(testSuite, callback) {
        let testMethods = testSuite.getTestMethods();
        let testMethod = null;
        let len = testMethods.length - 1;
        let cursor = 0;
        let _this = this;
        let testSuiteObj = testSuite.getTestSuite();
        let mapper = new AnnotatedMethodsMapper_1.AnnotatedMethodsMapper(testSuite.getAnnotatedMethods());
        let describeScope = null;
        let repeat = 0;
        this.sendMessage("test suite run");
        describe(testSuite.getDescription(), function () {
            if (testSuite.isDisabled()) {
                it(`disabled test suite: ${testSuiteObj.constructor.name}`);
                return;
            }
            describeScope = this;
            _this.applyAnnotatedMethod(mapper.getMethodByType(jec_juta_1.AnnotatedMethodType.BEFORE_CLASS), testSuiteObj, describeScope);
            _this.applyAnnotatedMethod(mapper.getMethodByType(jec_juta_1.AnnotatedMethodType.AFTER_CLASS), testSuiteObj, describeScope);
            _this.applyAnnotatedMethod(mapper.getMethodByType(jec_juta_1.AnnotatedMethodType.BEFORE), testSuiteObj, describeScope);
            _this.applyAnnotatedMethod(mapper.getMethodByType(jec_juta_1.AnnotatedMethodType.AFTER), testSuiteObj, describeScope);
            for (; cursor <= len; ++cursor) {
                testMethod = testMethods[cursor];
                repeat = testMethod.repeat;
                if (repeat && repeat > 0) {
                    while (repeat--) {
                        _this.applyTestMethod(testMethod, testSuiteObj, describeScope);
                    }
                }
                else
                    _this.applyTestMethod(testMethod, testSuiteObj, describeScope);
            }
            _this.sendMessage("test suite complete");
            callback(null);
        });
    }
    runAllTests(testSuiteColl, callback) {
        let len = testSuiteColl.length;
        let process = true;
        while (len-- && process) {
            this.runTest(testSuiteColl[len], (err) => {
                if (err) {
                    process = false;
                    callback(err);
                }
                else if (len <= 0 && process)
                    callback(null);
            });
        }
    }
}
exports.TigerTestRunner = TigerTestRunner;
