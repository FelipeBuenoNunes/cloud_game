import { Router } from "express";
import routerUser from "./users"
import routerWallet from "./wallet";

const router = Router();

router.use(routerUser);
router.use(routerWallet);

export default router;