import Cookie from 'cookie'
import { IncomingMessage } from "http";
import ws from "ws";
import { ISocket } from "./models/wSocket";
import { room } from "./service/room";

export const wsServer = new ws.Server({ noServer: true });
var i = 0

function ifValidFormatRoomNameInUrl(url?: string) {
    if (!url) return false;
    return /^\/[a-zA-Z_]{6,20}$/.test(url);
}

function getRoomNameOfUrl(query: string): string {
    query = query.slice(1, query.length).replace('_', ' ');
    return query;
}


wsServer.on('connection', (socket: ISocket, req: IncomingMessage) => {
    //const session = new sessionWs(req.headers.auth!.toString() || "");
    i++;
    socket.idUser = i.toString();//todo

    if (!ifValidFormatRoomNameInUrl(req.url)) socket.close();

    room.createOrEnter(
        getRoomNameOfUrl(req.url!),
        socket
    );
    socket.room = getRoomNameOfUrl(req.url!)

    socket.on('message', message => {
        const event = JSON.parse(message.toString());
        const currentRoom = room.getRoomByName(socket.room);
        if (!currentRoom) return socket.close();
        socket.emit(event.name, currentRoom)
    })

    socket.on("get_card", (currentRoom: room) => {
        const finished = currentRoom.getCard(socket.idUser);
        if(!finished) socket.emit("finish_game", currentRoom)
    })

    socket.on("start_game", (currentRoom: room) => {
        currentRoom.startGame();
    })

    socket.on("finish_game", (currentRoom: room) => {
        currentRoom.finishGame();
    })

    socket.on("close", code => {
        const currentRoom = room.getRoomByName(socket.room)
        if(currentRoom) currentRoom.exit(socket.idUser);
        console.log(room.getCreatedRooms())
    });
});
