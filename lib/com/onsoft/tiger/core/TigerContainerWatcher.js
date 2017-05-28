"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TigerContainerWatcher {
    constructor() {
        this._contextPath = null;
        this._testSuites = null;
        this.initObj();
    }
    initObj() {
        this._contextPath = process.cwd();
        this._testSuites = new Array();
    }
    getContextPath() {
        return this._contextPath;
    }
    addTestSuite(testSuite) {
        this._testSuites.push(testSuite);
    }
    getTestSuites() {
        return this._testSuites;
    }
}
exports.TigerContainerWatcher = TigerContainerWatcher;
