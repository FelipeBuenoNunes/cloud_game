import { NextFunction, Request, Response } from "express";
import { InvalidSession } from "../../../models/errors/client";
import sessionServices from "../../../service/session/sessionServices";

class validateSession {
    private cookie: string;

    public async middleware(req: Request, res: Response, next: NextFunction) {
        const cookie = req.cookies();
        this.cookie = cookie[sessionServices.cookieName]
        if(!this.cookie) return next();

        if(!await this.validateCookie()) return next(InvalidSession);
        
        

    }

    private validateCookie() {
        return sessionServices.isValidSession(this.cookie)
    }
}
