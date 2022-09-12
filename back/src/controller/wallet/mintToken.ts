import { NextFunction, Request, Response } from "express";
import { apiResponseError } from "../../models";
import { UnspecifiedError } from "../../models/errors/server";
import { mintTokenData } from "../../models/requests/mintTokem";
import { walletSuccessResponse } from "../../models/responses/walletSuccess";
import sessionServices from "../../service/session/sessionServices";
import { walletService } from "../../service/wallet/wallet";


export class mintToken {
    public async handler(req: Request, res: Response, next: NextFunction) {
        try {
            const data: mintTokenData = req.body;
            const cookieService: sessionServices = res.locals.sessionClass;
            const success = await new walletService().minttoken(cookieService.get().publicKey, data.amount);
            const response: walletSuccessResponse = { success };

            res.json(response);
        } catch(e) {
            if(e instanceof apiResponseError) return next(e);
            next(UnspecifiedError);
        }
    }
}