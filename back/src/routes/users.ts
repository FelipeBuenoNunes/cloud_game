import { Request, Response, Router } from "express";
import { getMessage, createUser } from "../controller/user/index";

const router = Router();

router.post("/new-user", new createUser().handler.bind(new createUser()));
//router.post("/login")
router.get("/get-message", new getMessage().handler.bind(new getMessage()));

export default router;