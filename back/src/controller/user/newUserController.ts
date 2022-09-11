import { NextFunction, Request, Response } from "express";
import { apiResponseError } from "../../models";
import { UnspecifiedError } from "../../models/errors/server";
import { newUserData } from '../../models/requests/newUser';
import newUser from '../../service/user/newUser';
import sessionControls from '../../service/session/sessionServices'


export default class createUser {
    public async handler(req: Request, res: Response, next: NextFunction) {
        try {
            const newUserData: newUserData = req.body;
            const userManipulator = new newUser();
            const user = await userManipulator.insertUser(newUserData);
            
            const session = new sessionControls(user.id, user.wallet_public_key);

            res.cookie(sessionControls.cookieName, session.getID(), { expires: session.getExpires() })
            res.status(200).end();
            
        }catch(e) {
            if(e instanceof apiResponseError) return next(e)
            next(UnspecifiedError)            
        }
    }
}