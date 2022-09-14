import { argumentFunctionValidate } from "../../config/http/middleware/parserAndValidate";
import { RegexPublicWallet } from "./regexps";

export interface newUserData {
    personalWallet: string,
    password: string,
    userName: string,
}

/**
 * @swagger
 * components:
 *   schemas:
 *     newUserData:
 *       type: object
 *       properties:
 *         personalWallet:
 *           type: string
 *           example: ""
 *         password:
 *           type: string
 *           description: Is a message signed
 *           example: ""
 *         username:
 *           type: string
 *           example: ""
 */

export const newUserExpected: argumentFunctionValidate = {
    obj: { 
        personalWallet: "",
        userName: "",
        password: ""
    } as newUserData,
    //todo: regex to validate password
    regExps: new Map<string, RegExp>([
        ["personalWallet", RegexPublicWallet]
    ])
};
