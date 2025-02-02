import { RespondType } from "../controllers/TestControllers";

export const tryCatchWrapper = (fn: RespondType): RespondType => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};
