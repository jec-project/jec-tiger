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

import {TigerLoggerProxy} from "../logging/TigerLoggerProxy";
import {UrlStringsEnum, SourceFileInspector, FilePreProcessor, FileProperties} from "jec-commons";
import {WalkPathUtil} from "jec-commons-node";

/**
 * The default <code>SourceFileInspector</code> implementation for Tiger
 * containers.
 */
export class TigerSourceFileInspector implements SourceFileInspector {

  ////////////////////////////////////////////////////////////////////////////
  // Constructor function
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>TigerSourceFileInspector</code> instance.
   */
  constructor() {
    this.init();
  }

  ////////////////////////////////////////////////////////////////////////////
  // Private properties
  ////////////////////////////////////////////////////////////////////////////

  /**
   * The collection of <code>FilePreProcessor</code> instances used by this
   * inspector.
   */
  private _processors:Array<FilePreProcessor> = null;

  /**
   * The collection of source paths to inspect.
   */
  private _sourcePaths:Array<string> = null;

  /**
   * The watcher object associated with this inspector.
   */
  private _watcher:any = null;

  /**
   * The target location for the source paths to inspect.
   */
  private _targetPath:string = null;

  /**
   * The helper object that lists all files in a directory.
   */
  private _walkUtil:WalkPathUtil = null;

  ////////////////////////////////////////////////////////////////////////////
  // Private methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes this object.
   */
  private init():void {
    this._processors = new Array<FilePreProcessor>();
    this._sourcePaths = new Array<string>();
    this._walkUtil = new WalkPathUtil();
  }

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

  /**
   * Inspects the specified source path.
   */
  private inspectSourcePath(sourcePath:string):void {
    let file:string = null;
    let targetPath:string = this._targetPath + sourcePath;
    this._walkUtil.walkSync(targetPath, (file:FileProperties)=> {
      this.processFile(file);
    });
    this.notifyProcessComplete(targetPath);
  }

  /**
   * Notifies the specified <code>FileProperties</code> instance to all the 
   * registered processors.
   * 
   * @param {FileProperties} file the <code>FileProperties<code> instance notify to all
   *                              the registered processors.
   */
  private processFile(file:FileProperties):void {
    let len:number = this._processors.length;
    while(len--) {
      this._processors[len].process(file, this._watcher);
    }
  }

  /**
   * Notifies the registered processors that the process for the current source  
   * path is over.
   * 
   * @param {string} sourcePath the current source path.
   */
  private notifyProcessComplete(sourcePath:string):void {
    let len:number = this._processors.length;
    while(len--) {
      this._processors[len].processComplete(this._watcher, sourcePath);
    }
  }

  ////////////////////////////////////////////////////////////////////////////
  // Public methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public setWatcher(watcher:any):void {
    this._watcher = watcher;
    this._targetPath = watcher.getContextPath() + UrlStringsEnum.SLASH;
    this.sendMessage("new watcher set");
  }

  /**
   * @inheritDoc
   */
   public getWatcher():any {
     return this._watcher;
   }

  /**
   * @inheritDoc
   */
  public addProcessor(processor:FilePreProcessor):void {
    this._processors.push(processor);
    this.sendMessage("new processor added: " + processor.constructor.name);
  }

  /**
   * @inheritDoc
   */
  public addSourcePath(path:string):void {
    this._sourcePaths.push(path);
    this.sendMessage("new source path added: " + path);
  }

  /**
   * @inheritDoc
   */
  public inspect():void {
    let len:number = this._processors.length;
    if(len > 0) {
      this.sendMessage("lookup process start");
      len = this._sourcePaths.length;
      while(len--) {
        this.inspectSourcePath(this._sourcePaths[len]);
      }
      this.sendMessage("lookup process complete");
    }
  }
}
