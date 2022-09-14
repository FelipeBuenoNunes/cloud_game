import { argumentFunctionValidate } from "../../config/http/middleware/parserAndValidate";


export interface mintTokenData {
    amount: number
}
/**
 * @swagger
 * components:
 *   schemas:
 *     mintTokemData:
 *       type: object
 *       properties:
 *         amount:
 *           type: number
 *           example: 0
 */

export const mintTokenDataExpected: argumentFunctionValidate = {
    obj: { 
        amount: 0,
    } as mintTokenData,
    //empty
    regExps: new Map<string, RegExp>()
};
