"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jec_juta_1 = require("jec-juta");
const TigerLoggerProxy_1 = require("../logging/TigerLoggerProxy");
const AnnotatedMethodsMapper_1 = require("../utils/AnnotatedMethodsMapper");
const TigerTestStats_1 = require("./TigerTestStats");
require("mocha");
const moment = require("moment");
class TigerTestRunner {
    constructor() {
        this._stats = null;
        this._runMultipleTests = false;
        this._testStart = null;
    }
    sendMessage(message, logLevel) {
        TigerLoggerProxy_1.TigerLoggerProxy.getInstance().log(message, logLevel);
    }
    applyTestMethod(method, testSuiteObj, scope, stats) {
        let name = method.name;
        let timeout = method.timeout;
        let desc = `${name}: ${method.description}`;
        if (method.disabled) {
            stats.numDisabledTests++;
            it(`disabled test: ${name}`);
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
    initStats(multiple) {
        let stats = (this._stats === null) ? new TigerTestStats_1.TigerTestStats() :
            this._stats;
        if (multiple)
            this._runMultipleTests = true;
        else
            this._testStart = new Date();
        return stats;
    }
    computeTestDuration() {
        let now = new Date();
        let duration = moment(now).diff(moment(this._testStart));
        this._stats.duration = duration;
        this._stats.time = moment(duration).format("mm:ss.SSS");
        this._testStart = null;
        this._runMultipleTests = false;
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
        let name = testSuiteObj.constructor.name;
        this._stats = this.initStats();
        this.sendMessage(`test suite run: ${name}`);
        describe(testSuite.getDescription(), function () {
            if (testSuite.isDisabled()) {
                _this._stats.numDisabledTestSuites++;
                it(`disabled test suite: ${name}`);
                return;
            }
            _this._stats.numTestSuites++;
            describeScope = this;
            _this.applyAnnotatedMethod(mapper.getMethodByType(jec_juta_1.AnnotatedMethodType.BEFORE_ALL), testSuiteObj, describeScope);
            _this.applyAnnotatedMethod(mapper.getMethodByType(jec_juta_1.AnnotatedMethodType.AFTER_ALL), testSuiteObj, describeScope);
            _this.applyAnnotatedMethod(mapper.getMethodByType(jec_juta_1.AnnotatedMethodType.BEFORE), testSuiteObj, describeScope);
            _this.applyAnnotatedMethod(mapper.getMethodByType(jec_juta_1.AnnotatedMethodType.AFTER), testSuiteObj, describeScope);
            for (; cursor <= len; ++cursor) {
                testMethod = testMethods[cursor];
                repeat = testMethod.repeat;
                if (repeat && repeat > 0) {
                    while (repeat--) {
                        _this.applyTestMethod(testMethod, testSuiteObj, describeScope, _this._stats);
                    }
                }
                else {
                    _this.applyTestMethod(testMethod, testSuiteObj, describeScope, _this._stats);
                }
            }
            _this.sendMessage("test suite complete");
            if (!_this._runMultipleTests)
                _this.computeTestDuration();
            callback(_this._stats);
        });
    }
    runAllTests(testSuiteColl, callback) {
        let len = testSuiteColl.length;
        let process = true;
        this._stats = this.initStats(true);
        this._testStart = new Date();
        while (len-- && process) {
            this.runTest(testSuiteColl[len], (innerStats) => {
                if (innerStats.error) {
                    process = false;
                    this.computeTestDuration();
                    callback(this._stats);
                }
                else if (len <= 0 && process) {
                    this.computeTestDuration();
                    callback(this._stats);
                }
            });
        }
        this._stats = null;
    }
}
exports.TigerTestRunner = TigerTestRunner;
