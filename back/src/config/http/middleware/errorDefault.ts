import { NextFunction, Request, Response } from "express";
import { apiResponseError } from "../../../models";

export function errorDefault(err: apiResponseError, req: Request, res: Response, next: NextFunction) {
  const message = err.returns();
  res
    .status(message.code)
    .send(message);
}