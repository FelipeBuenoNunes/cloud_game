import { Router } from "express";
import routerUser from "./users"

const router = Router();

router.use(routerUser)

export default router;