import express from "express";
import cors from "cors";
import router from "../routes/router";
import cookieParser from "cookie-parser"
import { errorDefault } from "./http/middleware/errorDefault";
import swaggerUI from "swagger-ui-express";
import configSwagger from "./swagger";
import { config } from "./dotenv";

const app = express();

const corsConfiguration = {
    "origin": config.CONFIG_CORS,
    "credentials": true
}

app.use(cors(corsConfiguration));
app.use("/docs", swaggerUI.serve, swaggerUI.setup(configSwagger()));
app.use(cookieParser());
app.use(router);
app.use(errorDefault)

export default app;