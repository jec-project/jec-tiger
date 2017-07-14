"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const jec_juta_1 = require("jec-juta");
class TestClassRunner {
    constructor() { }
    checkDisabledTest(method) {
        if (method.disabled) {
            it(`disabled config method: ${method.name}`);
            return true;
        }
        else
            return false;
    }
    applyStaticMethod(method, ClassRef, scope) {
        let timeout = -1;
        let methodRef = null;
        if (method) {
            if (this.checkDisabledTest(method))
                return;
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
            }
            if (method.async) {
                methodRef((done) => {
                    ClassRef[method.name](done);
                });
            }
            else {
                methodRef(() => {
                    ClassRef[method.name]();
                });
            }
        }
    }
    applyAnnotatedMethod(method, testSuiteObj, scope) {
        let timeout = -1;
        let methodRef = null;
        if (method) {
            if (this.checkDisabledTest(method))
                return;
            timeout = method.timeout;
            if (timeout && timeout > 0)
                scope.timeout(timeout);
            switch (method.type) {
                case jec_juta_1.AnnotatedMethodType.BEFORE_ALL:
                    methodRef = before;
                    break;
                case jec_juta_1.AnnotatedMethodType.AFTER_ALL:
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
    applyGlobalFixtures(testPolicy, mapper, testSuiteObj, scope) {
        if (testPolicy === jec_juta_1.InstanciationPolicy.SINGLE) {
            this.applyAnnotatedMethod(mapper.getMethodByType(jec_juta_1.AnnotatedMethodType.BEFORE_ALL), testSuiteObj, scope);
            this.applyAnnotatedMethod(mapper.getMethodByType(jec_juta_1.AnnotatedMethodType.AFTER_ALL), testSuiteObj, scope);
        }
        else {
            let ClassRef = testSuiteObj.constructor;
            this.applyStaticMethod(mapper.getMethodByType(jec_juta_1.AnnotatedMethodType.BEFORE_CLASS), ClassRef, scope);
            this.applyStaticMethod(mapper.getMethodByType(jec_juta_1.AnnotatedMethodType.AFTER_CLASS), ClassRef, scope);
        }
    }
    applyTestMethod(method, testSuiteObj, scope, stats) {
        let name = method.name;
        let timeout = method.timeout;
        let desc = `${name}: ${method.description}`;
        if (this.checkDisabledTest(method)) {
            stats.numDisabledTests++;
            return;
        }
        if (timeout && timeout > 0)
            scope.timeout(timeout);
        if (method.async) {
            stats.numAsyncTests++;
            it(desc, (done) => {
                testSuiteObj[name](done);
            });
        }
        else {
            stats.numTests++;
            it(desc, () => {
                testSuiteObj[name]();
            });
        }
    }
    runSingleInstanceTests(testMethods, mapper, testSuiteObj, scope, stats) {
        let testMethod = null;
        let len = testMethods.length - 1;
        let cursor = 0;
        let repeat = 0;
        this.applyAnnotatedMethod(mapper.getMethodByType(jec_juta_1.AnnotatedMethodType.BEFORE), testSuiteObj, scope);
        this.applyAnnotatedMethod(mapper.getMethodByType(jec_juta_1.AnnotatedMethodType.AFTER), testSuiteObj, scope);
        for (; cursor <= len; ++cursor) {
            testMethod = testMethods[cursor];
            repeat = testMethod.repeat;
            if (repeat && repeat > 0) {
                while (repeat--) {
                    this.applyTestMethod(testMethod, testSuiteObj, scope, stats);
                }
            }
            else {
                this.applyTestMethod(testMethod, testSuiteObj, scope, stats);
            }
        }
    }
    runMultipleInstanceTest(testMethods, mapper, testSuiteObj, stats) {
        let testMethod = null;
        let len = testMethods.length - 1;
        let cursor = 0;
        let repeat = 0;
        let ClassRef = testSuiteObj.constructor;
        let newInstance = null;
        let scope = null;
        let _this = this;
        for (; cursor <= len; ++cursor) {
            describe("Isolated Test", function () {
                _this.applyAnnotatedMethod(mapper.getMethodByType(jec_juta_1.AnnotatedMethodType.BEFORE), testSuiteObj, scope);
                _this.applyAnnotatedMethod(mapper.getMethodByType(jec_juta_1.AnnotatedMethodType.AFTER), testSuiteObj, scope);
                scope = this;
                newInstance = new ClassRef();
                testMethod = testMethods[cursor];
                repeat = testMethod.repeat;
                if (repeat && repeat > 0) {
                    while (repeat--) {
                        _this.applyTestMethod(testMethod, testSuiteObj, scope, stats);
                    }
                }
                else {
                    _this.applyTestMethod(testMethod, testSuiteObj, scope, stats);
                }
            });
        }
    }
}
exports.TestClassRunner = TestClassRunner;
;
