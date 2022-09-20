import { json, Request, Response, Router } from "express";
import { validateSession } from "../config/http/middleware/validateSession";
import { getMessage, createUser, login, handshakeToken } from "../controller/user/index";
import { PatternValidate } from "../config/http/middleware/parserAndValidate"
import { loginUserDataExpected } from "../models/requests/login";
import { newUserExpected } from "../models/requests/newUser";

const router = Router();

/**
 * @swagger
 * /new-user:
 *  post:
 *      description: Generate a new user and set a cookie (after the message is signed)
 *      tags: [users]
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/loginUserData'
 *      responses:
 *          200:
 *            description: OK and set a cookie
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

router.post("/new-user",
    json({ reviver: PatternValidate(newUserExpected) }),
    new createUser().handler.bind(new createUser())
);

/**
 * @swagger
 * /get-message:
 *  get:
 *      description: Get the message before login or new user, this endpoint returns a message to sign
 *      tags: [users]
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
 *                  $ref: '#/components/schemas/getMessageResponse'
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

router.get("/get-message", new getMessage().handler.bind(new getMessage()));

/**
 * @swagger
 * /login:
 *  post:
 *      description: To login and return a cookie (after the message is signed)
 *      tags: [users]
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/loginUserData'
 *      responses:
 *          200:
 *            description: OK and set a cookie
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
router.post("/login",
    new validateSession().middleware.bind(new validateSession()),
    json({ reviver: PatternValidate(loginUserDataExpected) }),
    new login().handler.bind(new login())
);

router.get("/handshake-tokem",
    new validateSession().middleware.bind(new validateSession()),
    new handshakeToken().handler.bind(new handshakeToken())
)

router.get("/infos", new validateSession().middleware.bind(new validateSession()),
    (req: Request, res: Response) => {
    res.json({name: res.locals.sessionClass.session.name});
});

export default router;