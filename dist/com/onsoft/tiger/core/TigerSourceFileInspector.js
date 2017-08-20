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
        let file = null;
        let targetPath = this._targetPath + sourcePath;
        this._walkUtil.walkSync(targetPath, (file) => {
            this.processFile(file);
        });
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
        let result = false;
        let id = this._processors.indexOf(processor);
        if (id !== -1) {
            this._processors.splice(id, 1);
            this.sendMessage("new processor added: " + processor.constructor.name);
        }
        return result;
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
