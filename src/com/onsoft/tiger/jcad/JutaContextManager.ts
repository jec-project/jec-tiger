//  DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
//
//   Copyright 2016-2017 Pascal ECHEMANN.
//
//   Licensed under the Apache License, Version 2.0 (the "License");
//   you may not use this file except in compliance with the License.
//   You may obtain a copy of the License at
//
//       http://www.apache.org/licenses/LICENSE-2.0
//
//   Unless required by applicable law or agreed to in writing, software
//   distributed under the License is distributed on an "AS IS" BASIS,
//   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//   See the License for the specific language governing permissions and
//   limitations under the License.

import {JcadContext, Decorator, DecoratorConnector, JcadContextManager,
        JcadContextFactory, DecoratorConnectorManager} from "jec-commons";
import {JutaConnectorRefs} from "jec-juta";
import {TigerConnector} from "./connectors/TigerConnector";
import {TestSuiteDecorator} from "./decorators/TestSuiteDecorator";
import {TestDecorator} from "./decorators/TestDecorator";
import {AfterAllDecorator} from "./decorators/AfterAllDecorator";
import {AfterDecorator} from "./decorators/AfterDecorator";
import {BeforeAllDecorator} from "./decorators/BeforeAllDecorator";
import {BeforeDecorator} from "./decorators/BeforeDecorator";
import {AsyncDecorator} from "./decorators/AsyncDecorator";

/**
 * A helper class that is used to manage desciptor contexts for the JUTA
 * specification.
 * 
 * @class JutaContextManager
 */
export class JutaContextManager {
  
  ////////////////////////////////////////////////////////////////////////////
  // Constructor function
  ////////////////////////////////////////////////////////////////////////////

  constructor() {}

  ////////////////////////////////////////////////////////////////////////////
  // Private properties
  ////////////////////////////////////////////////////////////////////////////

  /**
   * The reference to the __JcadContext__ associated with this  context manager.
   * 
   * @attribute _jcadContext
   * @private
   * @type JcadContext
   * @default null
   */
  private _jcadContext:JcadContext = null;

  ////////////////////////////////////////////////////////////////////////////
  // Private methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes the context for the specified reference.
   * 
   * @method initContext
   * @private
   * @param {string} jcadReference the reference of the context to initialize.
   * @param {Class} decoratorClass the reference to the decorator class
   *                               associated whith the context to initialize.
   */
  private initContext(jcadReference:string, decoratorClass:any):void {
    let ctxManager:JcadContextManager = JcadContextManager.getInstance();
    let connManager:DecoratorConnectorManager =
                                        DecoratorConnectorManager.getInstance();
    let decorator:Decorator = new decoratorClass();
    let connector:DecoratorConnector =
                                   new TigerConnector(jcadReference, decorator);
    ctxManager.addContext(jcadReference, this._jcadContext);
    connManager.addConnector(connector, this._jcadContext);
  }

  /**
   * Removes the context with the specified reference.
   * 
   * @method removeContext
   * @private
   * @param {string} jcadReference the reference of the context to remove.
   */
  private removeContext(jcadReference:string):void {
    let ctxManager:JcadContextManager = JcadContextManager.getInstance();
    let connManager:DecoratorConnectorManager =
                                        DecoratorConnectorManager.getInstance();
    connManager.removeConnector(jcadReference, this._jcadContext);
    ctxManager.removeContext(jcadReference);
  }

  ////////////////////////////////////////////////////////////////////////////
  // public methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes the JCAD context associated with this context manager.
   * 
   * @method createContext
   */
  public createContext():void {
    let ctxFactory:JcadContextFactory = new JcadContextFactory();
    this._jcadContext = ctxFactory.create();
    this.initContext(
      JutaConnectorRefs.TEST_SUITE_CONNECTOR_REF, TestSuiteDecorator
    );
    this.initContext(
      JutaConnectorRefs.TEST_CONNECTOR_REF, TestDecorator
    );
    this.initContext(
      JutaConnectorRefs.AFTER_ALL_CONNECTOR_REF, AfterAllDecorator
    );
    this.initContext(
      JutaConnectorRefs.AFTER_CONNECTOR_REF, AfterDecorator
    );
    this.initContext(
      JutaConnectorRefs.BEFORE_ALL_CONNECTOR_REF, BeforeAllDecorator
    );
    this.initContext(
      JutaConnectorRefs.BEFORE_CONNECTOR_REF, BeforeDecorator
    );
    this.initContext(
      JutaConnectorRefs.ASYNC_CONNECTOR_REF, AsyncDecorator
    );
  }

  /**
   * Finalizes the JCAD context associated with this context manager.
   * 
   * @method deleteContext
   */
  public deleteContext():void {
    this.removeContext(JutaConnectorRefs.TEST_SUITE_CONNECTOR_REF);
    this.removeContext(JutaConnectorRefs.TEST_CONNECTOR_REF);
    this.removeContext(JutaConnectorRefs.AFTER_ALL_CONNECTOR_REF);
    this.removeContext(JutaConnectorRefs.AFTER_CONNECTOR_REF);
    this.removeContext(JutaConnectorRefs.BEFORE_ALL_CONNECTOR_REF);
    this.removeContext(JutaConnectorRefs.BEFORE_CONNECTOR_REF);
    this.removeContext(JutaConnectorRefs.ASYNC_CONNECTOR_REF);
    this._jcadContext = null;
  }
}
