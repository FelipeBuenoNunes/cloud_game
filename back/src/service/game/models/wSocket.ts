import ws from "ws";


export interface ISocket extends ws.WebSocket {
    idUser: string
    idRoom: string
}