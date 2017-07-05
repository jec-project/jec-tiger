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

import "mocha";
import {expect} from "chai";
import {AnnotatedMethod, AnnotatedMethodType} from "jec-juta";

// ALL to test:
import {AnnotatedMethodsMapper} from "../../../../../src/com/onsoft/tiger/utils/AnnotatedMethodsMapper";

// Utilities:
import * as utils from "../../../../../utils/test-utils/utilities/AnnotatedMethodsMapperTestUtils";

// Test:
describe("AnnotatedMethodsMapper", ()=> {

  describe("#getMethodByType()", ()=> {
    let mapper:AnnotatedMethodsMapper = utils.buildEmptyMapper();

    it("should return null when no AnnotatedMethodType.BEFORE_ALL method is specified", function() {
      expect(mapper.getMethodByType(AnnotatedMethodType.BEFORE_ALL)).to.be.null;
    });

    it("should return null when no AnnotatedMethodType.AFTER_ALL method is specified", function() {
      expect(mapper.getMethodByType(AnnotatedMethodType.AFTER_ALL)).to.be.null;
    });

    it("should return null when no AnnotatedMethodType.BEFORE method is specified", function() {
      expect(mapper.getMethodByType(AnnotatedMethodType.BEFORE)).to.be.null;
    });

    it("should return null when no AnnotatedMethodType.AFTER method is specified", function() {
      expect(mapper.getMethodByType(AnnotatedMethodType.AFTER)).to.be.null;
    });
  });

  describe("#getMethodByType()", ()=> {
    let mapper:AnnotatedMethodsMapper = utils.buildCompleteMapper();

    it("should return the registered method for the type AnnotatedMethodType.BEFORE_ALL", function() {
      expect(mapper.getMethodByType(AnnotatedMethodType.BEFORE_ALL)).to.equal(utils.BEFORE_ALL_METHOD);
    });

    it("should return the registered method for the type AnnotatedMethodType.AFTER_ALL", function() {
      expect(mapper.getMethodByType(AnnotatedMethodType.AFTER_ALL)).to.equal(utils.AFTER_ALL_METHOD);
    });

    it("should return the registered method for the type AnnotatedMethodType.BEFORE", function() {
      expect(mapper.getMethodByType(AnnotatedMethodType.BEFORE)).to.equal(utils.BEFORE_METHOD);
    });

    it("should return the registered method for the type AnnotatedMethodType.AFTER", function() {
      expect(mapper.getMethodByType(AnnotatedMethodType.AFTER)).to.equal(utils.AFTER_METHOD);
    });
  });

});
