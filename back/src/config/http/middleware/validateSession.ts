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
        if(!this.hasCookie(cookie)) return

        this.cookie = cookie[sessionServices.cookieName];
        if(!this.hasCookie(cookie)) return
        this.validateCookie();
        if(!this.obj) return next(InvalidSession)
        
        return res.send(JSON.stringify(this.obj.get()));
    }

    private hasCookie(cookie: string|undefined = this.cookie): boolean {
        console.log(cookie);
        if(cookie) {
            console.log(this.path);
            (this.path === "/login") ? this.nextFunction() : this.nextFunction(InvalidSession);
            return false;
        }
        return true;
    }

    private async validateCookie() {
        this.obj = await sessionServices.createWithCookie(this.cookie!) || undefined
    }
}
