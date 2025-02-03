import express, { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

export const validate = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const validateResult = schema.validate(req.body);
    if (validateResult.error) {
      res.status(400).json({ error: validateResult.error.details[0].message });
    }
    next();
  };
};
