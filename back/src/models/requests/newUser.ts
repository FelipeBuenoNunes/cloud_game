import { argumentFunctionValidate } from "../../config/http/middleware/parserAndValidate";
import { RegexPublicWallet } from "./regexps";

export interface newUserData {
    personalWallet: string,
    password: string,
    userName: string,
}

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
