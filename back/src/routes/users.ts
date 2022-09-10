import { Request, Response, Router } from "express";
import { validateSession } from "../config/http/middleware/validateSession";
import { getMessage, createUser, login } from "../controller/user/index";

const router = Router();

router.post("/new-user", new createUser().handler.bind(new createUser()));

router.get("/get-message", new getMessage().handler.bind(new getMessage()));

router.post("/login", 
    new validateSession().middleware.bind(new validateSession()), 
    new login().handler.bind(new login())
);

export default router;