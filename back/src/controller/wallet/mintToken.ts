import { NextFunction, Request, Response } from "express";
import { apiResponseError } from "../../models";
import { UnspecifiedError } from "../../models/errors/server";
import { walletSuccessResponse } from "../../models/responses/walletSuccess";
import sessionServices from "../../service/session/sessionServices";
import { walletService } from "../../service/wallet/wallet";


export class mintTokem {
    public async handler(req: Request, res: Response, next: NextFunction) {
        try {
            const amount = req.body.amount;
            const cookieService: sessionServices = res.locals.sessionClass;
            console.log(cookieService.get(), amount)
            const success = await new walletService().mintTokem(cookieService.get().publicKey, amount);
            const response: walletSuccessResponse = { success };
            res.json(response);
        } catch(e) {
            if(e instanceof apiResponseError) return next(e);
            next(UnspecifiedError);
        }
    }
}