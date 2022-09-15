import app from "./config/express";
import "reflect-metadata"
import { config } from "./config/dotenv"
import { AppDataSource } from "./clients/orm/type-orm"
import { wsServer } from "./service/game/ws";
import { startSessionWs } from "./service/game/validateSession";

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


server.on('upgrade', (request, socket, head) => {
    wsServer.handleUpgrade(request, socket, head, s => {
        
        wsServer.emit('connection', s, request);
    });
});