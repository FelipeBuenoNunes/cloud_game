import { NextFunction, Request, Response } from "express";
import { InvalidSession } from "../../../models/errors/client";
import sessionServices from "../../../service/session/sessionServices";


export class validateSession {
    private cookie?: string;
    private path: string;
    private obj?: sessionServices;
    private nextFunction: NextFunction;

    public async middleware(req: Request, res: Response, next: NextFunction) {
        this.nextFunction = next;
        this.path = req.path;

        const cookie = req.cookies;
        if(!Object.keys(cookie).includes(sessionServices.cookieName)) return this.validateEndpoint(res)
        
        this.cookie = cookie[sessionServices.cookieName];
        await this.validateCookie();
        if(!this.obj) return this.validateEndpoint(res);
        
        res.locals.sessionClass = this.obj;
        if(this.path === "/login") {
            this.obj.updateSession();
            res.cookie(sessionServices.cookieName, this.obj.getID(), { expires: this.obj.getExpires() });
            return res.status(200).end();
        }
        this.nextFunction();
    }

    private validateEndpoint(res: Response) {
        res.cookie(sessionServices.cookieName, "", { expires: new Date() });
        (this.path === "/login") ? this.nextFunction() : this.nextFunction(InvalidSession);
    }

    private async validateCookie() {
        this.obj = await sessionServices.createWithCookie(this.cookie!) || undefined
    }
}
