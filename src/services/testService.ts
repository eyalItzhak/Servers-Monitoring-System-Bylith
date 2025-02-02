import { RespondType } from "../controllers/TestControllers";
import { AppError } from "../errors/AppError";

const errorTest = () => {
  throw new Error("Error test");
};

const errorTestCustom = () => {
  throw new AppError("Error Custom", 200);
};

const sayHelloTestCustom = async (res: any) => {
  await res.send("Hello World");
};

export const testService = { errorTest, errorTestCustom, sayHelloTestCustom };
