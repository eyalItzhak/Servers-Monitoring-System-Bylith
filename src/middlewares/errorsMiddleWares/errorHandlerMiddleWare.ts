import { NextFunction } from "express";
import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";

export const errorHandlerMiddleWare = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({ message });
};
