import { json, Router } from "express";
import { PatternValidate } from "../config/http/middleware/parserAndValidate";
import { validateSession } from "../config/http/middleware/validateSession";
import { getBalance } from "../controller/wallet/balance";
import { mintToken } from "../controller/wallet/mintToken";
import { mintTokenDataExpected } from "../models/requests/mintTokem";


const router = Router();
const regexp = /^\/wallet\/[a-zA-Z_]*$/;
router.use(regexp, new validateSession().middleware.bind(new validateSession()));

/**
 * @swagger
 * /wallet/get_balance:
 *  get:
 *      description: Return the balance
 *      tags: [wallets]
 *      parameters: 
 *        - in: header
 *          name: pachin-game/cookie
 *          schema:
 *            type: string
 *            format: uuid
 *            required: true
 *      responses:
 *          200:
 *            description: OK
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/getBalanceResponse'
 *          400:
 *              description: Bad Request
 *              content:
 *                application/json:
 *                  schema:
 *                    $ref: '#/components/schemas/messageError'
 *          500:
 *              description: Bad Request
 *              content:
 *                application/json:
 *                  schema:
 *                    $ref: '#/components/schemas/messageError'
 */
router.get("/wallet/balance", new getBalance().handler.bind(new getBalance()));

/**
 * @swagger
 * /wallet/buy_token:
 *  post:
 *      description: To buy tokens
 *      tags: [wallets]
 *      parameters: 
 *        - in: header
 *          name: pachin-game/cookie
 *          schema:
 *            type: string
 *            format: uuid
 *            required: true
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/mintTokemData'
 *      responses:
 *          200:
 *            description: OK
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/walletSuccessResponse'
 *          400:
 *              description: Bad Request
 *              content:
 *                application/json:
 *                  schema:
 *                    $ref: '#/components/schemas/messageError'
 *          500:
 *              description: Bad Request
 *              content:
 *                application/json:
 *                  schema:
 *                    $ref: '#/components/schemas/messageError'
 */
router.post("/wallet/buy_token", 
    json({ reviver: PatternValidate(mintTokenDataExpected) }),
    new mintToken().handler.bind(new mintToken())
);

export default router;