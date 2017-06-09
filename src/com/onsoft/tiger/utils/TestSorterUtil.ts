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

import {TestSorters, TestMethod} from "jec-juta";

/**
 * A helper class that sorts test method collections for a test suite.
 */
export class TestSorterUtil {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>TestSorterUtil</code> instance.
   */
  constructor() {}

  //////////////////////////////////////////////////////////////////////////////
  // Private methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Sorts the specified test method in as by usng the <code>name</code>
   * property, in lexicographic order.
   * 
   * @param {TestMethod} a the first element to compare.
   * @param {TestMethod} b the secon element to compare.
   * 
   * @return {number} the result of the comparaison.
   */
  private nameAscendingSorter(a:TestMethod, b:TestMethod):number {
    let aVal:string = a.name;
    let bVal:string = b.name;
    if(aVal < bVal) return -1;
    if(aVal > bVal) return 1;
    return 0;
  }

  /**
   * Sorts the specified test method in as by usng the <code>name</code>
   * property, in inverted lexicographic order.
   * 
   * @param {TestMethod} a the first element to compare.
   * @param {TestMethod} b the secon element to compare.
   * 
   * @return {number} the result of the comparaison.
   */
  private nameDescendingSorter(a:TestMethod, b:TestMethod):number {
    let aVal:string = a.name;
    let bVal:string = b.name;
    if(aVal > bVal) return -1;
    if(aVal < bVal) return 1;
    return 0;
  }

  /**
   * Sorts the specified test method in as by usng the <code>order</code>
   * property, from lower to higher values.
   * 
   * @param {TestMethod} a the first element to compare.
   * @param {TestMethod} b the secon element to compare.
   * 
   * @return {number} the result of the comparaison.
   */
  private orderDescendingSorter(a:TestMethod, b:TestMethod):number {
    let aVal:number = a.order;
    let bVal:number = b.order;
    if(aVal > bVal) return -1;
    if(aVal < bVal) return 1;
    return 0;
  }

  /**
   * Sorts the specified test method in as by usng the <code>order</code>
   * property, from higher to lower values.
   * 
   * @param {TestMethod} a the first element to compare.
   * @param {TestMethod} b the secon element to compare.
   * 
   * @return {number} the result of the comparaison.
   */
  private orderAscendingSorter(a:TestMethod, b:TestMethod):number {
    let aVal:number = a.order;
    let bVal:number = b.order;
    if(aVal < bVal) return -1;
    if(aVal > bVal) return 1;
    return 0;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Sorts the specified collection of <code>TestMethod</code> objects according 
   * to the <code>sortBy</code> parameter value.
   * 
   * @param {Array<TestMethod>} methods the collection of
   *                                    <code>TestMethod</code> objects to sort.
   * @param {number} sortBy a constant of the <code>TestSorters</code> enum that
   *                        indicates the algorithm to use for sorting the test
   *                        methods.
   */
  public sort(methods:TestMethod[], sortBy:number):void {
    let sortMethod:(a:TestMethod, b:TestMethod)=>number = null;
    switch(sortBy) {
      case TestSorters.NAME_ASCENDING:
        sortMethod = this.nameAscendingSorter;
        break;
      case TestSorters.NAME_DESCENDING:
        sortMethod = this.nameDescendingSorter;
        break;
      case TestSorters.ORDER_ASCENDING:
        sortMethod = this.orderAscendingSorter;
        break;
      case TestSorters.ORDER_DESCENDING:
        sortMethod = this.orderDescendingSorter;
        break;
      case TestSorters.DEFAULT:
      default:
    }
    if(sortMethod) {
      methods.sort(sortMethod);
    }
  }
};
