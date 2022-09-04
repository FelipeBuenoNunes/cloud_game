import { Request, Response } from "express";
import { apiResponse } from "../../models";
import {newUserData} from '../../models/userData'
import newUser from '../../service/user/newUserService'


export default class createUser {
    //private service
    public async handler(req: Request, res: Response) {
        const newUserData: newUserData = req.body;
        console.log(newUserData);

        const userManipulator = new newUser();
        const userExist = await userManipulator.checkUserExistence(newUserData.userName);

        console.log(userExist);

        if (userExist === true){
            
            const response: apiResponse = {
                data: {},
                message: ['user already exists in server']
            }

            
            res.status(409)
            res.json(response)

        } else {

            const newUserId = await userManipulator.insertUser(newUserData);
        
            const response: apiResponse = {
                data: newUserId,
                message: new Array()
            }
            res.json(response)
        }
        //validar o conteúdo do body
        // const service = new this.service();
        // const responseData = service.createMessage();

    }
}