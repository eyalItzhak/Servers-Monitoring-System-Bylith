import express, { NextFunction, Request, Response } from "express";
import { AppError } from "../../errors/AppError";

export function notFoundHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  throw new AppError("Page Not Found", 404);
}
