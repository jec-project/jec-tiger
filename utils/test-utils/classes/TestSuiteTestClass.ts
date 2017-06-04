import {TestSuite, Test} from "jec-juta";

@TestSuite({
  description: "Sample test suite"
})
export class TestSuiteTestClass {

  @Test({
    description: "Sample test method"
  })
  public testMethod():void {}
}