import { Request, Response } from "express";
import { testService } from "../services/testService";

export type RespondType = (req: Request, res: Response, next: any) => any;

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
