import { Request, Response } from "express";
import { UnspecifiedError } from "../../models/errors/server";
import sessionServices from "../../service/session/sessionServices";
import handshakeTokenService from "../../service/user/handshakeToken";

export default class handshakeToken {

    public handler(req: Request, res: Response) {
        try {
            const cookieService: sessionServices = res.locals.sessionClass;
            res.send(new handshakeTokenService(cookieService).getTempToken());
        } catch(e) {
            console.error("handshake:\n", e);
            throw UnspecifiedError
        }
    }
}