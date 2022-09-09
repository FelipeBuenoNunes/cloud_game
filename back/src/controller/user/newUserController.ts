import { NextFunction, Request, Response } from "express";
import { apiResponseError } from "../../models";
import { UnspecifiedError } from "../../models/errors/server";
import { newUserData } from '../../models/requests/newUser';
import newUser from '../../service/user/newUserService';
import sessionControls from '../../service/session/sessionServices'


export default class createUser {
    public async handler(req: Request, res: Response, next: NextFunction) {
        try {
            const newUserData: newUserData = req.body;
            const userManipulator = new newUser();
            const newUserID = await userManipulator.insertUser(newUserData);
            
            const session = new sessionControls(newUserID);

            res.cookie(sessionControls.cookieName, session.get())
            res.send("algum dado aqui...")
            
        }catch(e) {
            if(e instanceof apiResponseError) return next(e)
            next(UnspecifiedError)            
        }
    }
}