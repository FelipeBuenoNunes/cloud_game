import { NextFunction, Request, Response } from "express";
import { InvalidSession } from "../../../models/errors/client";
import sessionServices from "../../../service/session/sessionServices";
import sessionControls from '../../..//service/session/sessionServices'


export class validateSession {
    private cookie?: string;
    private path: string;
    private obj?: sessionServices;
    private nextFunction: NextFunction;

    public async middleware(req: Request, res: Response, next: NextFunction) {
        this.nextFunction = next;
        this.path = req.path;

        const cookie = req.cookies;
        if(!Object.keys(cookie).includes(sessionServices.cookieName)) return this.validateEndpoint()
        
        this.cookie = cookie[sessionServices.cookieName];
        await this.validateCookie();
        if(!this.obj) return this.validateEndpoint();
        
        res.locals.sessionClass = this.obj;
        if(this.path === "/login") {
            res.cookie(sessionControls.cookieName, this.obj.getID(), { expires: this.obj.getExpires() });
            res.status(200).send();
        }
        this.nextFunction();
    }

    private validateEndpoint() {
        (this.path === "/login") ? this.nextFunction() : this.nextFunction(InvalidSession);
    }

    private async validateCookie() {
        this.obj = await sessionServices.createWithCookie(this.cookie!) || undefined
    }
}
