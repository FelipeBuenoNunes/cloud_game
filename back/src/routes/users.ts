import { Request, Response, Router } from "express";
import { getMessage } from "../controller/user/index";

const router = Router();

//router.post("/new-user")
//router.post("/login")
router.get("/get-message", new getMessage().handler.bind(new getMessage()))

export default router;