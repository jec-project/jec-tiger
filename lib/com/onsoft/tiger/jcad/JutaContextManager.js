"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jec_commons_1 = require("jec-commons");
const jec_juta_1 = require("jec-juta");
const TigerConnector_1 = require("./connectors/TigerConnector");
const TestSuiteDecorator_1 = require("./decorators/TestSuiteDecorator");
const TestDecorator_1 = require("./decorators/TestDecorator");
const AfterClassDecorator_1 = require("./decorators/AfterClassDecorator");
const AfterDecorator_1 = require("./decorators/AfterDecorator");
const BeforeClassDecorator_1 = require("./decorators/BeforeClassDecorator");
const BeforeDecorator_1 = require("./decorators/BeforeDecorator");
const AsyncDecorator_1 = require("./decorators/AsyncDecorator");
class JutaContextManager {
    constructor() {
        this._jcadContext = null;
    }
    initContext(jcadReference, decoratorClass) {
        let ctxManager = jec_commons_1.JcadContextManager.getInstance();
        let connManager = jec_commons_1.DecoratorConnectorManager.getInstance();
        let decorator = new decoratorClass();
        let connector = new TigerConnector_1.TigerConnector(jcadReference, decorator);
        ctxManager.addContext(jcadReference, this._jcadContext);
        connManager.addConnector(connector, this._jcadContext);
    }
    removeContext(jcadReference) {
        let ctxManager = jec_commons_1.JcadContextManager.getInstance();
        let connManager = jec_commons_1.DecoratorConnectorManager.getInstance();
        connManager.removeConnector(jcadReference, this._jcadContext);
        ctxManager.removeContext(jcadReference);
    }
    createContext() {
        let ctxFactory = new jec_commons_1.JcadContextFactory();
        this._jcadContext = ctxFactory.create();
        this.initContext(jec_juta_1.JutaConnectorRefs.TEST_SUITE_CONNECTOR_REF, TestSuiteDecorator_1.TestSuiteDecorator);
        this.initContext(jec_juta_1.JutaConnectorRefs.TEST_CONNECTOR_REF, TestDecorator_1.TestDecorator);
        this.initContext(jec_juta_1.JutaConnectorRefs.AFTER_CLASS_CONNECTOR_REF, AfterClassDecorator_1.AfterClassDecorator);
        this.initContext(jec_juta_1.JutaConnectorRefs.AFTER_CONNECTOR_REF, AfterDecorator_1.AfterDecorator);
        this.initContext(jec_juta_1.JutaConnectorRefs.BEFORE_CLASS_CONNECTOR_REF, BeforeClassDecorator_1.BeforeClassDecorator);
        this.initContext(jec_juta_1.JutaConnectorRefs.BEFORE_CONNECTOR_REF, BeforeDecorator_1.BeforeDecorator);
        this.initContext(jec_juta_1.JutaConnectorRefs.ASYNC_CONNECTOR_REF, AsyncDecorator_1.AsyncDecorator);
    }
    deleteContext() {
        this.removeContext(jec_juta_1.JutaConnectorRefs.TEST_SUITE_CONNECTOR_REF);
        this.removeContext(jec_juta_1.JutaConnectorRefs.TEST_CONNECTOR_REF);
        this.removeContext(jec_juta_1.JutaConnectorRefs.AFTER_CLASS_CONNECTOR_REF);
        this.removeContext(jec_juta_1.JutaConnectorRefs.AFTER_CONNECTOR_REF);
        this.removeContext(jec_juta_1.JutaConnectorRefs.BEFORE_CLASS_CONNECTOR_REF);
        this.removeContext(jec_juta_1.JutaConnectorRefs.BEFORE_CONNECTOR_REF);
        this.removeContext(jec_juta_1.JutaConnectorRefs.ASYNC_CONNECTOR_REF);
        this._jcadContext = null;
    }
}
exports.JutaContextManager = JutaContextManager;
