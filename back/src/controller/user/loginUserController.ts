import { NextFunction, Request, Response } from "express";
import { apiResponseError } from "../../models";
import { UnspecifiedError } from "../../models/errors/server";
import loginService from '../../service/user/login';
import { loginUserData } from "../../models/requests/login";
import sessionControls from '../../service/session/sessionServices'

export default class login {
    public async handler(req: Request, res: Response, next: NextFunction) {
        try {
            const loginData: loginUserData = req.body;
            const login = new loginService(loginData);

            const user = await login.getUser();
            if(!user.id) throw "Unspecified error";
            const session = new sessionControls(user.id, user.wallet_public_key);
            res.cookie(sessionControls.cookieName, session.getID(), { expires: session.getExpires() });
            res.status(200).send();
        }catch(e) {
            if(e instanceof apiResponseError) return next(e);
            next(UnspecifiedError);
        }
    }
}