import { Request, Response, Router } from "express";

const router = Router();

router.get("/user", (req: Request, res: Response) => {
    res.send("Hello, world!")
})

export default router;