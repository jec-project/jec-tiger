//  DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
//
//   Copyright 2016-2018 Pascal ECHEMANN.
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

import "mocha";
import {expect} from "chai";
import {TestSorters, TestMethod} from "jec-juta";

// Class to test:
import {TestSorterUtil} from "../../../../../src/com/onsoft/tiger/utils/TestSorterUtil";

// Utilities:
import * as utils from "../../../../..//utils/test-utils/utilities/TestSorterUtilTestUtils";

// Test:
describe("TestSorterUtil", ()=> {

  let sorter:TestSorterUtil = null;

  beforeEach(()=> {
    sorter = new TestSorterUtil();
  });

  afterEach(()=> {
    sorter = null;
  });

  describe("#sort()", ()=> {
    it("should run the process event if the collection to sort is empty", ()=>{
      const methods:Array<TestMethod> = new Array<TestMethod>();
      expect(sorter.sort(methods, TestSorters.DEFAULT)).to.be.undefined;
    });
  });

  describe("#sort(TestSorters.DEFAULT)", ()=> {
    it("should run the process whithout changing the order of the collection to sort", ()=>{
      const methods:TestMethod[] = utils.getTestMethods();
      sorter.sort(methods, TestSorters.DEFAULT);
      let len:number = methods.length;
      while(len--) {
        expect(methods[len]).to.equal(utils.DEFAULT_SORT[len]);
      }
    });
  });
  
  describe("#sort(TestSorters.NAME_ASCENDING)", ()=> {
    it("should order the collection by usng the 'name' property in lexicographic order.", ()=>{
      const methods:TestMethod[] = utils.getTestMethods();
      sorter.sort(methods, TestSorters.NAME_ASCENDING);
      let len:number = methods.length;
      while(len--) {
        expect(methods[len]).to.equal(utils.NAME_ASCENDING_SORT[len]);
      }
    });
  });
  
  describe("#sort(TestSorters.NAME_DESCENDING)", ()=> {
    it("should order the collection by usng the 'name' property in inverted lexicographic order.", ()=>{
      const methods:TestMethod[] = utils.getTestMethods();
      sorter.sort(methods, TestSorters.NAME_DESCENDING);
      let len:number = methods.length;
      while(len--) {
        expect(methods[len]).to.equal(utils.NAME_DESCENDING_SORT[len]);
      }
    });
  });
  
  describe("#sort(TestSorters.ORDER_ASCENDING)", ()=> {
    it("should order the collection by usng the 'order' property from lower to higher value.", ()=>{
      const methods:TestMethod[] = utils.getTestMethods();
      sorter.sort(methods, TestSorters.ORDER_ASCENDING);
      let len:number = methods.length;
      while(len--) {
        expect(methods[len]).to.equal(utils.ORDER_ASCENDING_SORT[len]);
      }
    });
  });
  
  describe("#sort(TestSorters.ORDER_DESCENDING)", ()=> {
    it("should order the collection by usng the 'order' property from higher to lower value.", ()=>{
      const methods:TestMethod[] = utils.getTestMethods();
      sorter.sort(methods, TestSorters.ORDER_DESCENDING);
      let len:number = methods.length;
      while(len--) {
        expect(methods[len]).to.equal(utils.ORDER_DESCENDING_SORT[len]);
      }
    });
  });
});