import { Router } from "express";
import { validateSession } from "../config/http/middleware/validateSession";
import { getBalance } from "../controller/wallet/balance";
import { minttoken } from "../controller/wallet/mintToken";


const router = Router();
const regexp = /^\/wallet\/[a-zA-Z_]*$/;
router.use(regexp, new validateSession().middleware.bind(new validateSession()));

router.get("/wallet/balance", new getBalance().handler.bind(new getBalance()));

router.post("/wallet/buy_token", new minttoken().handler.bind(new minttoken()));

export default router;