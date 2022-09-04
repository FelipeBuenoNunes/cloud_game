import express from "express";
import cors from "cors";
import router from "../routes/router";
import { errorDefault } from "./http/middleware/errorDefault";

const app = express();

app.use(cors())
app.use(express.json())
app.use(router)
//app.use(errorDefault)

export default app;