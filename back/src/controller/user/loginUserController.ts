import { NextFunction, Request, Response } from "express";
import { apiResponseError } from "../../models";
import { UnspecifiedError } from "../../models/errors/server";
import { newUserData } from '../../models/requests/newUser';
import findUser from '../../service/user/findUserService';
import sessionControls from '../../service/user/sessionServices'


export default class login {
    public async handler(req: Request, res: Response, next: NextFunction) {
        try {
            const newUserData: newUserData = req.body;
            const userFinder = new findUser();
            const result = await userFinder.findUser(newUserData);


            // const newUserSuccess = await userManipulator.insertUser(newUserData);

            // const sessionManipulation = new sessionControls();
            // const sessionValue = await sessionManipulation.createUserSession(newUserSuccess);

            // res.cookie("session", sessionValue)
            // res.type('application/json')
            // res.send(`{"userSideWallet": "${newUserSuccess}"}`)
            res.type('application/json')
            res.json({oi: 'aparecei'});
            
        }catch(e) {
            if(e instanceof apiResponseError) return next(e)
            next(UnspecifiedError)            
        }
    }
}