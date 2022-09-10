import { Router } from "express";
import { validateSession } from "../config/http/middleware/validateSession";
import { getBalance } from "../controller/wallet/balance";
import { mintTokem } from "../controller/wallet/mintToken";


const router = Router();
const regexp = /^\/wallet\/[a-zA-Z]*$/gm;
//router.use(regexp, new validateSession().middleware.bind(new validateSession()));

router.get(
    "/wallet/balance",
    new validateSession().middleware.bind(new validateSession()),
    new getBalance().handler.bind(new getBalance())
);

router.post(
    "/wallet/buy_tokem",
    new validateSession().middleware.bind(new validateSession()),
    new mintTokem().handler.bind(new mintTokem())
);

export default router;