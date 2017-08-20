"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RunableTestSuiteFactory_1 = require("../builders/RunableTestSuiteFactory");
const TigerLoggerProxy_1 = require("../logging/TigerLoggerProxy");
const JutaContextManager_1 = require("../jcad/JutaContextManager");
class TigerAutowireProcessor {
    constructor() {
        this._tigerContainer = null;
        this._contextManager = null;
        this.initObj();
    }
    initObj() {
        this._contextManager = new JutaContextManager_1.JutaContextManager();
        this._contextManager.createContext();
    }
    getTigerContainer() {
        return this._tigerContainer;
    }
    setTigerContainer(container) {
        this._tigerContainer = container;
    }
    processStart(watcher, sourcePath) { }
    process(file, watcher) {
        let decorators = file.decorators;
        let len = decorators.length;
        let decorator = null;
        let logger = TigerLoggerProxy_1.TigerLoggerProxy.getInstance();
        let factory = new RunableTestSuiteFactory_1.RunableTestSuiteFactory();
        let testSuite = null;
        while (len--) {
            decorator = decorators[len];
            if (decorator.classPath === TigerAutowireProcessor.JUTA_MASK &&
                decorator.name === TigerAutowireProcessor.TEST_SUITE_MASK) {
                testSuite = factory.create(file, this._tigerContainer);
                watcher.addTestSuite(testSuite);
                logger.log("autowired test suite detected: source file='" + file.name + "'");
            }
        }
    }
    processComplete(watcher, sourcePath) {
        this._contextManager.deleteContext();
    }
}
TigerAutowireProcessor.TEST_SUITE_MASK = "TestSuite";
TigerAutowireProcessor.JUTA_MASK = "jec-juta";
exports.TigerAutowireProcessor = TigerAutowireProcessor;
