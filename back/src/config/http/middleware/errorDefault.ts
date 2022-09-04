import { Request, Response } from "express";

export function errorDefault(err: Error, req: Request, res: Response) {
    res.send(`{"err": "${err.message}"}`)
}