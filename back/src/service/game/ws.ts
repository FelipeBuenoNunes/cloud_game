import Cookie from 'cookie'
import { IncomingMessage } from "http";
import ws from "ws";
import sessionServices from '../session/sessionServices';
import { ISocket } from "./models/wSocket";
import { room } from "./service/room";

export const wsServer = new ws.Server({ noServer: true });

wsServer.on('connection', (socket: ISocket, req: IncomingMessage) => {

    sessionServices.getWithCookie(req.headers.auth as string)
        .then(session => {
            socket.idUser = session!.getID();
            socket.name = session!.get().name
            socket.idRoom = room.joinRoom(socket);
            session!.updateSession(true, socket.idRoom);
        });

    socket.on('message', message => {
        const event = JSON.parse(message.toString());
        const currentRoom = room.getRoomById(socket.idRoom);
        if (!currentRoom) return socket.close();

        if (!event.data) socket.emit(event.name, currentRoom)
        else socket.emit(event.name, currentRoom, event.data);
    })

    socket.on("start_round", async (currentRoom: room, value: any) => {
        const num = Number(value)
        if (isNaN(num)) socket.close();
        const error = await currentRoom.placeBet({
            idPlayer: socket.idUser,
            name: socket.name,
            bet: num
        })
        if(error) socket.send(JSON.stringify(error));
    })

    socket.on("get_card", async (currentRoom: room) => {
        try{
            await currentRoom.getCard(socket.idUser);
        }catch(e) {
            socket.emit("close")
        }
    })

    socket.on("double_bet", async (currenRoom: room) => {
        try{
            await currenRoom.doubleBet(socket.idUser);
        } catch(e) {
            socket.emit("close")
        }
    })

    socket.on("stop",async (currentRoom: room) => {
        try {
            await currentRoom.stop(socket.idUser)
        }catch(e) {
            socket.emit("close")
        }
    })

    socket.on("close", code => {
        const currentRoom = room.getRoomById(socket.idRoom)
        if (currentRoom) currentRoom.exit(socket.idUser);
        socket.close();
    });
});
