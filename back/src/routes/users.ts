import { Request, Response, Router } from "express";
import { getMessage, createUser, login } from "../controller/user/index";

const router = Router();

router.post("/new-user", new createUser().handler.bind(new createUser()));
//router.post("/login", (req, res, next) => )
router.get("/get-message", new getMessage().handler.bind(new getMessage()));
router.post("/login", new login().handler.bind(new login()));

export default router;