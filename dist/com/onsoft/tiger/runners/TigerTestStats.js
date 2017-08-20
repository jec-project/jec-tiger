"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TigerTestStats {
    constructor() {
        this.numTestSuites = 0;
        this.numDisabledTestSuites = 0;
        this.numTests = 0;
        this.numDisabledTests = 0;
        this.numAsyncTests = 0;
        this.duration = 0;
        this.time = null;
        this.error = null;
    }
}
exports.TigerTestStats = TigerTestStats;
