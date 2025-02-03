import { testService } from "../services/testService";
import { RespondType } from "../constants/types/controllerTypes";

export class TestController {
  // Method to handle "Hello World" response
  public static sayHelloController: RespondType = async (req, res) => {
    await testService.sayHelloTestCustom(res);
  };

  public static throwErrorTestController: RespondType = async (
    req,
    res,
    next
  ) => {
    await testService.errorTest();
  };

  public static throwErrorCusTomTestController: RespondType = async (
    req,
    res,
    next
  ) => {
    await testService.errorTestCustom();
  };
}
