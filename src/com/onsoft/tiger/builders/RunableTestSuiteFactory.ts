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

import {Tiger} from "../Tiger";
import {TigerLoggerProxy} from "../logging/TigerLoggerProxy";
import {TestSuiteDescriptor} from "../reflect/TestSuiteDescriptor";
import {TestSuiteDescriptorRegistry} from "../metadata/TestSuiteDescriptorRegistry";
import {JecStringsEnum, UrlStringsEnum, ClassLoader, FileProperties} from "jec-commons";
import {RunableTestSuite} from "jec-juta";
import {TigerRunableTestSuite} from "../runners/model/TigerRunableTestSuite";

/**
 * The factory class which is used by the Tiger framework to create
 * <code>RunableTestSuite</code> instances.
 */
export class RunableTestSuiteFactory {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>RunableTestSuiteFactory</code> instance.
   */
  constructor() {}

  //////////////////////////////////////////////////////////////////////////////
  // Private methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The wrapper function used to send decorated messages to the output stream.
   * 
   * @param {string} message the message to decorate and to send to the output
   *                         stream.
   * @param {number} logLevel the log level of the message sent to the output
   *                          stream. Valid values are the constants of the
   *                          <code>LogLevel</code> class.
   */
  private sendMessage(message:string, logLevel?:number):void {
    TigerLoggerProxy.getInstance().log(message, logLevel);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates and returns a new <code>RunableTestSuite</code> instance.
   * 
   * @param {FileProperties} file the <code>FileProperties</code> that contains
   *                              information about the resource class 
   *                              associated with the new 
   *                              <code>RunableTestSuite</code> instance.
   * @param {Tiger} tigerContainer the reference to the tiger container
   *                               associated with the new 
   *                               <code>RunableTestSuite</code> instance.
   * @return {RunableTestSuite} a new <code>RunableTestSuite</code> instance.
   */
  public create(file:FileProperties, tigerContainer:Tiger):RunableTestSuite {
    let descriptor:TestSuiteDescriptor = new TestSuiteDescriptor();
    TestSuiteDescriptorRegistry.registerDescriptor(descriptor);
    let loader:ClassLoader = new ClassLoader();
    let filePath:string = file.path + file.name + UrlStringsEnum.DOT +
                          JecStringsEnum.JS_EXTENSION;
    let ClassRef:any = loader.loadClass(filePath);
    let testSuiteObj:any = new ClassRef();
    let runnable:RunableTestSuite = new TigerRunableTestSuite();
    runnable.setTestSuite(testSuiteObj);
    TestSuiteDescriptorRegistry.registerDescriptor(null);
    return runnable;
  }
};
