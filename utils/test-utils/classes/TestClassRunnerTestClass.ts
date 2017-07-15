export class TestClassRunnerTestClass {

  public static invokator:any = null;

  public beforeAll():void {
    TestClassRunnerTestClass.invokator.notify("beforeAll");
  }

  public static beforeClass():void {
    TestClassRunnerTestClass.invokator.notify("beforeClass");
  }

  public before():void {
    TestClassRunnerTestClass.invokator.notify("before");
  }

  public test():void {
    TestClassRunnerTestClass.invokator.notify("test");
  }
  
  public test2():void {
    TestClassRunnerTestClass.invokator.notify("test2");
  }

  public test3():void {
    TestClassRunnerTestClass.invokator.notify("test3");
  }

  public afterAll():void {
    TestClassRunnerTestClass.invokator.notify("afterAll");
  }

  public static afterClass():void {
    TestClassRunnerTestClass.invokator.notify("afterClass");
  }

  public after():void {
    TestClassRunnerTestClass.invokator.notify("after");
  }
}