import { Request, Response } from "express";
import { apiResponse } from "../../models";
import getMessageService from "../../service/user/getMessageService"

export default class getMessage {
    private service = getMessageService
    public handler(req: Request, res: Response) {
        const service = new this.service();
        const responseData = service.createMessage();
        
        const response: apiResponse = {
            data: responseData,
            message: new Array()
        }
        res.json(response)
    }
}