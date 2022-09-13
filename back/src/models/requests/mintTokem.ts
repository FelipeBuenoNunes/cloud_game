import { argumentFunctionValidate } from "../../config/http/middleware/parserAndValidate";

export interface mintTokenData {
    amount: number
}

export const mintTokenDataExpected: argumentFunctionValidate = {
    obj: { 
        amount: 0,
    } as mintTokenData,
    //empty
    regExps: new Map<string, RegExp>()
};
