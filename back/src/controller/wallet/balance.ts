import { NextFunction, Request, Response } from "express";
import { apiResponseError } from "../../models";
import { UnspecifiedError } from "../../models/errors/server";
import { getBalanceResponse } from "../../models/responses/getBalance";
import sessionServices from "../../service/session/sessionServices";
import { walletService } from "../../service/wallet/wallet";


export class getBalance {
    public async handler(req: Request, res: Response, next: NextFunction) {
        try {
            const cookieService: sessionServices = res.locals.sessionClass;
            const balance = await new walletService().getBalance(cookieService.get().publicKey);
            const response: getBalanceResponse = { balance };
            res.json(response)
        } catch(e) {
            if(e instanceof apiResponseError) return next(e);
            next(UnspecifiedError);
        }
    }
}