import ws from "ws";

export const wsServer = new ws.Server({ noServer: true });

wsServer.on('connection', (socket: ws.WebSocket) => {
    socket.on('message', message => console.log(message.toString()))
    socket.on("close", (x: any) => console.log("cagaste", x));
});
