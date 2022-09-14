import { argumentFunctionValidate } from "../../config/http/middleware/parserAndValidate";
import { RegexPublicWallet } from "./regexps";

export interface loginUserData {
    personalWallet: string,
    password: string,
}

/**
 * @swagger
 * components:
 *   schemas:
 *     loginUserData:
 *       type: object
 *       properties:
 *         personalWallet:
 *           type: string
 *           example: ""
 *         password:
 *           type: string
 *           description: Is a message signed
 *           example: ""
 */

export const loginUserDataExpected: argumentFunctionValidate = {
    obj: { 
        personalWallet: "",
        password: ""
    } as loginUserData,
    regExps: new Map<string, RegExp>([
        ["personalWallet", RegexPublicWallet]
    ])
};
