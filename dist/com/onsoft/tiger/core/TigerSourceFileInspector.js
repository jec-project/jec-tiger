"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TigerLoggerProxy_1 = require("../logging/TigerLoggerProxy");
const jec_commons_1 = require("jec-commons");
const jec_commons_node_1 = require("jec-commons-node");
class TigerSourceFileInspector {
    constructor() {
        this._processors = null;
        this._sourcePaths = null;
        this._watcher = null;
        this._targetPath = null;
        this._walkUtil = null;
        this.beforeProcess = null;
        this.afterProcess = null;
        this.init();
    }
    init() {
        this._processors = new Array();
        this._sourcePaths = new Array();
        this._walkUtil = new jec_commons_node_1.WalkPathUtil();
    }
    sendMessage(message, logLevel) {
        TigerLoggerProxy_1.TigerLoggerProxy.getInstance().log(message, logLevel);
    }
    inspectSourcePath(sourcePath) {
        const targetPath = this._targetPath + sourcePath;
        let file = null;
        if (this.beforeProcess)
            this.beforeProcess(this._watcher);
        this._walkUtil.walkSync(targetPath, (file) => {
            this.processFile(file);
        });
        if (this.afterProcess)
            this.afterProcess(this._watcher);
        this.notifyProcessComplete(targetPath);
    }
    processFile(file) {
        let len = this._processors.length;
        while (len--) {
            this._processors[len].process(file, this._watcher);
        }
    }
    notifyProcessComplete(sourcePath) {
        let len = this._processors.length;
        while (len--) {
            this._processors[len].processComplete(this._watcher, sourcePath);
        }
    }
    setWatcher(watcher) {
        this._watcher = watcher;
        this._targetPath = watcher.getContextPath() + jec_commons_1.UrlStringsEnum.SLASH;
        this.sendMessage("new watcher set");
    }
    getWatcher() {
        return this._watcher;
    }
    addProcessor(processor) {
        this._processors.push(processor);
        this.sendMessage("new processor added: " + processor.constructor.name);
    }
    removeProcessor(processor) {
        const id = this._processors.indexOf(processor);
        let result = false;
        if (id !== -1) {
            this._processors.splice(id, 1);
            this.sendMessage("processor removed: " + processor.constructor.name);
        }
        return result;
    }
    removeProcessors() {
        this._processors.splice(0);
        this.sendMessage("all processors removed: ");
    }
    addSourcePath(path) {
        this._sourcePaths.push(path);
        this.sendMessage("new source path added: " + path);
    }
    inspect(inspectMode) {
        let len = this._processors.length;
        if (len > 0) {
            this.sendMessage("lookup process start");
            len = this._sourcePaths.length;
            while (len--) {
                this.inspectSourcePath(this._sourcePaths[len]);
            }
            this.sendMessage("lookup process complete");
        }
    }
    clearCache() { }
}
exports.TigerSourceFileInspector = TigerSourceFileInspector;
