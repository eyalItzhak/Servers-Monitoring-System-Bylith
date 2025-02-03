import { Request, Response, NextFunction } from "express";

export type RespondType = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;
