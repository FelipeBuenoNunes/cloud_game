import { NextFunction, Request, Response } from "express";
import { apiResponseError } from "../../models";
import { UnspecifiedError } from "../../models/errors/server";
import { newUserData } from '../../models/requests/newUser';
import newUser from '../../service/user/newUserService';
import sessionControls from '../../service/user/sessionServices'


export default class createUser {
    public async handler(req: Request, res: Response, next: NextFunction) {
        try {
            const newUserData: newUserData = req.body;
            const userManipulator = new newUser();
            const newUserSuccess = await userManipulator.insertUser(newUserData);

            const sessionManipulation = new sessionControls();
            const sessionValue = await sessionManipulation.createUserSession(newUserSuccess);

            res.cookie("session", sessionValue)
            res.type('application/json')
            res.send(`{"userSideWallet": "${newUserSuccess}"}`)
            
        }catch(e) {
            if(e instanceof apiResponseError) return next(e)
            next(UnspecifiedError)            
        }
    }
}