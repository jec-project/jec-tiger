"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jec_juta_1 = require("jec-juta");
class AnnotatedMethodsMapper {
    constructor(methods) {
        this._beforeClass = null;
        this._afterClass = null;
        this._before = null;
        this._after = null;
        this.initObj(methods);
    }
    initObj(methods) {
        let method = null;
        let len = methods.length;
        while (len--) {
            method = methods[len];
            switch (method.type) {
                case jec_juta_1.AnnotatedMethodType.BEFORE_CLASS:
                    this._beforeClass = method;
                    break;
                case jec_juta_1.AnnotatedMethodType.AFTER_CLASS:
                    this._afterClass = method;
                    break;
                case jec_juta_1.AnnotatedMethodType.BEFORE:
                    this._before = method;
                    break;
                case jec_juta_1.AnnotatedMethodType.AFTER:
                    this._after = method;
                    break;
            }
        }
    }
    getMethodByType(type) {
        let method = null;
        switch (type) {
            case jec_juta_1.AnnotatedMethodType.BEFORE_CLASS:
                method = this._beforeClass;
                break;
            case jec_juta_1.AnnotatedMethodType.AFTER_CLASS:
                method = this._afterClass;
                break;
            case jec_juta_1.AnnotatedMethodType.BEFORE:
                method = this._before;
                break;
            case jec_juta_1.AnnotatedMethodType.AFTER:
                method = this._after;
                break;
        }
        return method;
    }
}
exports.AnnotatedMethodsMapper = AnnotatedMethodsMapper;
;
