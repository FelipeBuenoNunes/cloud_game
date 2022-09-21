import app from "./config/express";
import "reflect-metadata"
import { config } from "./config/dotenv"
import { AppDataSource } from "./clients/orm/type-orm"
import { wsServer } from "./service/game/ws";
import { startSessionWs } from "./service/game/validateSession";
import { validateUser } from "./service/socket/validateUser";

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })

const server = app.listen(
    config.PORT,
    () => console.log(`http://localhost:${config.PORT}`)
);

//setInterval(() => console.log(process.memoryUsage().heapUsed / 1024 / 1024), 10000)

server.on('upgrade', async (request, socket, head) => {
    const cookie = request.headers["sec-websocket-protocol"];

    if (
        cookie === undefined ||
        typeof cookie !== "string" ||
        !(await new validateUser(cookie).couldConnect())
    ) {
        socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
        socket.destroy();
        return;
    }

    wsServer.handleUpgrade(request, socket, head, s => {
        wsServer.emit('connection', s, request);
    });
});