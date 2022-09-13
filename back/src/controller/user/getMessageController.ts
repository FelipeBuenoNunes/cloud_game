import { Request, Response } from "express";
import { getMessageResponse } from "../../models";
import getMessageService from "../../service/user/getMessage"

export default class getMessage {
    public handler(req: Request, res: Response) {
        const service = new getMessageService();
        const responseData = service.createMessage();
        
        const response: getMessageResponse = {
            data: responseData
        }
        res.json(response)
    }
}