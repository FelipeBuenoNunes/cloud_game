import { NextFunction, Request, Response } from "express";
import { apiResponseError } from "../../../models";
import { UnexpectedPayload } from "../../../models/errors/client";

export function errorDefault(err: apiResponseError, req: Request, res: Response, next: NextFunction) {
  console.log(err)
  if(err.message === "payload") err = UnexpectedPayload;
  const message = err.returns();
  res
    .status(message.code)
    .send(message);
}