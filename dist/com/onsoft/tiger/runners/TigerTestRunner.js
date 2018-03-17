"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jec_juta_1 = require("jec-juta");
const TigerLoggerProxy_1 = require("../logging/TigerLoggerProxy");
const AnnotatedMethodsMapper_1 = require("../utils/AnnotatedMethodsMapper");
const TestClassRunner_1 = require("./utils/TestClassRunner");
const TigerTestStats_1 = require("./TigerTestStats");
require("mocha");
const moment = require("moment");
class TigerTestRunner {
    constructor() {
        this._stats = null;
        this._runMultipleTests = false;
        this._testStart = null;
        this._classRunner = null;
        this.initObj();
    }
    initObj() {
        this._classRunner = new TestClassRunner_1.TestClassRunner();
    }
    sendMessage(message, logLevel) {
        TigerLoggerProxy_1.TigerLoggerProxy.getInstance().log(message, logLevel);
    }
    initStats(multiple) {
        const stats = (this._stats === null) ? new TigerTestStats_1.TigerTestStats() :
            this._stats;
        if (multiple)
            this._runMultipleTests = true;
        else
            this._testStart = new Date();
        return stats;
    }
    computeTestDuration() {
        const now = new Date();
        const duration = moment(now).diff(moment(this._testStart));
        this._stats.duration = duration;
        this._stats.time = moment(duration).format("mm:ss.SSS");
        this._testStart = null;
        this._runMultipleTests = false;
    }
    runTest(testSuite, callback) {
        const testMethods = testSuite.getTestMethods();
        const _this = this;
        const testSuiteObj = testSuite.getTestSuite();
        const mapper = new AnnotatedMethodsMapper_1.AnnotatedMethodsMapper(testSuite.getAnnotatedMethods());
        const name = testSuiteObj.constructor.name;
        const testPolicy = testSuite.getInstantiationPolicy();
        const stats = this.initStats();
        this._stats = stats;
        this.sendMessage(`test suite run: ${name}`);
        describe(testSuite.getDescription(), function () {
            if (testSuite.isDisabled()) {
                _this._stats.numDisabledTestSuites++;
                it(`disabled test suite: ${name}`);
                return;
            }
            _this._stats.numTestSuites++;
            _this._classRunner.applyGlobalFixtures(testPolicy, mapper, testSuiteObj, this);
            if (testPolicy === jec_juta_1.InstantiationPolicy.SINGLE) {
                _this._classRunner.runSingleInstanceTests(testMethods, mapper, testSuiteObj, this, stats);
            }
            else if (testPolicy === jec_juta_1.InstantiationPolicy.MULTIPLE) {
                _this._classRunner.runMultipleInstanceTest(testMethods, mapper, testSuiteObj, stats);
            }
            else {
                throw new jec_juta_1.TestSuiteError(`Instantiation Policy is not valid on test suite ${name}:
+expected InstantiationPolicy.SINGLE or InstantiationPolicy.MULTIPLE 
-actual ${testPolicy}`);
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
        if (len === 0) {
            this.computeTestDuration();
            callback(this._stats);
        }
        else {
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
        }
        this._stats = null;
    }
}
exports.TigerTestRunner = TigerTestRunner;
