"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jec_commons_1 = require("jec-commons");
class TigerLoggerProxy extends jec_commons_1.AbstractLoggerProxy {
    constructor() {
        super("[TIGER]");
        if (TigerLoggerProxy._locked || TigerLoggerProxy.INSTANCE) {
            this.throwSingletonError("TigerLoggerProxy");
        }
        TigerLoggerProxy._locked = true;
    }
    static getInstance() {
        if (TigerLoggerProxy.INSTANCE === null) {
            TigerLoggerProxy._locked = false;
            TigerLoggerProxy.INSTANCE = new TigerLoggerProxy();
        }
        return TigerLoggerProxy.INSTANCE;
    }
}
TigerLoggerProxy.INSTANCE = null;
TigerLoggerProxy._locked = true;
exports.TigerLoggerProxy = TigerLoggerProxy;
;
