"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TigerLoggerProxy_1 = require("../logging/TigerLoggerProxy");
const jec_commons_1 = require("jec-commons");
const TigerAutowireProcessor_1 = require("./TigerAutowireProcessor");
const TigerSourceFileInspector_1 = require("./TigerSourceFileInspector");
const TigerContainerWatcher_1 = require("./TigerContainerWatcher");
const jec_juta_1 = require("jec-juta");
const TigerTestRunner_1 = require("../runners/TigerTestRunner");
class DefaultTigerContainer {
    constructor() {
        this._testPaths = null;
        this._sourceFileInspector = null;
        this._version = null;
        this._testRunner = null;
        this.initObj();
    }
    initObj() {
        const logger = new jec_commons_1.ConsoleLogger();
        this._version = "1.2.0";
        TigerLoggerProxy_1.TigerLoggerProxy.getInstance().setLogger(logger);
        this._sourceFileInspector = new TigerSourceFileInspector_1.TigerSourceFileInspector();
        this._testRunner = new TigerTestRunner_1.TigerTestRunner();
    }
    sendMessage(message, logLevel) {
        TigerLoggerProxy_1.TigerLoggerProxy.getInstance().log(message, logLevel);
    }
    process(callback) {
        this.sendMessage("Tiger start");
        const watcher = new TigerContainerWatcher_1.TigerContainerWatcher();
        const processor = new TigerAutowireProcessor_1.TigerAutowireProcessor();
        let validSourcePaths = true;
        let errorMessage = null;
        if (this._testPaths === null || this._testPaths.length === 0) {
            this.setTestPaths(["test"]);
        }
        this._sourceFileInspector.setWatcher(watcher);
        processor.setTigerContainer(this);
        this._sourceFileInspector.addProcessor(processor);
        try {
            this._sourceFileInspector.inspect(null);
        }
        catch (e) {
            if (e.code === "ENOENT") {
                validSourcePaths = false;
                errorMessage = "invalid test classes paths";
            }
            this.sendMessage(`${errorMessage}\n${e.stack}`, jec_commons_1.LogLevel.ERROR);
            processor.processComplete(null, null);
            callback(new jec_juta_1.TestSuiteError(errorMessage));
        }
        if (validSourcePaths) {
            this._testRunner.runAllTests(watcher.getTestSuites(), (err) => {
                callback(err);
                this.sendMessage("Tiger complete");
            });
        }
    }
    getVersion() {
        return this._version;
    }
    setTestPaths(paths) {
        let len = paths.length;
        this._testPaths = paths;
        while (len--)
            this._sourceFileInspector.addSourcePath(paths[len]);
    }
    getTestPaths() {
        return this._testPaths;
    }
}
exports.DefaultTigerContainer = DefaultTigerContainer;
;
