import { TestController } from "../controllers/TestControllers";
import { IRoute } from "../types/route.interface";
import { tryCatchWrapper } from "../utils/tryCatchWrapper";

export class TestRoute extends IRoute {
  protected initializeRoutes() {
    this.router.get(
      "/test",
      tryCatchWrapper(TestController.sayHelloController)
    );
    this.router.get(
      "/errorTest",
      tryCatchWrapper(TestController.throwErrorTestController)
    ),
      this.router.get(
        "/customErrorTest",
        tryCatchWrapper(TestController.throwErrorCusTomTestController)
      );
  }
}
