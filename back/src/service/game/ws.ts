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

function geRoomNameOfUrlAndValidate(query: string): string {
    query = query.slice(1, query.length).replace('_', ' ');
    return query;
}


wsServer.on('connection', (socket: ISocket, req: IncomingMessage) => {
    i++;
    socket.idUser = i.toString();//todo

    if (!ifValidFormatRoomNameInUrl(req.url)) socket.close();

    room.createOrEnter(
        geRoomNameOfUrlAndValidate(req.url!),
        socket
    );
    socket.idRoom = geRoomNameOfUrlAndValidate(req.url!)


    socket.on('message', message => {
        const event = JSON.parse(message.toString());
        const currentRoom = room.getRoomById(socket.idRoom);
        if (!currentRoom) return socket.close();
        socket.emit(event.name, currentRoom)
    })

    socket.on("get_card", (currentRoom: room) => {
        currentRoom.getCard(socket.idUser);
    })

    socket.on("close", code => {
        const currentRoom = room.getRoomById(socket.idRoom)
        if(currentRoom) currentRoom.exit(socket.idUser);
        console.log(room.getCreatedRooms())
    });
});
