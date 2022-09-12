import { argumentFunctionValidate } from "../../config/http/middleware/parserAndValidate";
import { RegexPublicWallet } from "./regexps";

export interface loginUserData {
    personalWallet: string,
    password: string,
}

export const loginUserDataExpected: argumentFunctionValidate = {
    obj: { 
        personalWallet: "",
        password: ""
    } as loginUserData,
    regExps: new Map<string, RegExp>([
        ["personalWallet", RegexPublicWallet]
    ])
};
