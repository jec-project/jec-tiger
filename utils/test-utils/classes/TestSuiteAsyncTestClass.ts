import {TestSuite, Test, Async} from "jec-juta";

@TestSuite({
  description: "Sample asynchronous test suite"
})
export class TestSuiteAsyncTestClass {

  @Test({
    description: "Sample asynchronous test method"
  })
  public testMethod(@Async callback:Function):void {
    callback();
  }
}