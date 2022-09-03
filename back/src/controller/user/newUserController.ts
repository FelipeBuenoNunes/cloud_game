import { Request, Response } from "express";
import { apiResponse } from "../../models";


export default class getMessage {
    //private service
    public handler(req: Request, res: Response) {
        const body = req.body();
        //validar o conteúdo do body
        const service = new this.service();
        const responseData = service.createMessage();
        
        const response: apiResponse = {
            data: responseData,
            message: new Array()
        }
        res.json(response)
    }
}