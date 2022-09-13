import { json, Router } from "express";
import { validateSession } from "../config/http/middleware/validateSession";
import { getMessage, createUser, login, handshakeToken } from "../controller/user/index";
import { PatternValidate } from "../config/http/middleware/parserAndValidate"
import { loginUserDataExpected } from "../models/requests/login";
import { newUserExpected } from "../models/requests/newUser";

const router = Router();

router.post("/new-user",
    json({ reviver: PatternValidate(newUserExpected) }),
    new createUser().handler.bind(new createUser())
);

router.get("/get-message", new getMessage().handler.bind(new getMessage()));

router.post("/login",
    new validateSession().middleware.bind(new validateSession()),
    json({ reviver: PatternValidate(loginUserDataExpected) }),
    new login().handler.bind(new login())
);

router.get("/handshake-tokem",
    new validateSession().middleware.bind(new validateSession()),
    new handshakeToken().handler.bind(new handshakeToken())
)

export default router;