import { ISocket } from "../models/wSocket";
import { logicGame } from "./gameLogic";

type Rooms = {
    id: string
    name: string
    qtdPlayers: number
}

export class room {
    private static rooms = new Map<string, room>();
    
    public static getCreatedRooms(): Rooms[] {
        const arrRooms: Rooms[] = [];
        
        this.rooms.forEach((room: room, id: string) => arrRooms.push({
            id: id,
            name: room.name,
            qtdPlayers: room.users.length
        }));
        
        return arrRooms;
    }
    
    public static getRoomById(id: string) {
        return room.rooms.get(id)
    }

    //enter if has a room with the given name and returns a boolean
    private static enterIfhasRoom(name: string, user: ISocket): boolean {
        const possibleRoom = room.getRoomById(name);
        if(possibleRoom) {
            possibleRoom.enter(user);
            return true;
        }
        return false;
    }

    public static createOrEnter (name: string, user: ISocket) {
        //Exists? If yes enter, else you can create
        if(room.enterIfhasRoom(name, user)) return;
        new room(name, user);
    }
    
    //Instace methods

    private id: string;
    private name: string;
    private users: ISocket[];
    private game: logicGame
    
    constructor(name: string, user: ISocket) {
        this.id = name; //todo
        this.users = [user]; //first user
        this.name = name;
        this.game = new logicGame();
        room.rooms.set(this.name, this);
    }

    private enter(user: ISocket): boolean {
        //If the room is full, close the connection
        if (this.users.length >= 5) {
            user.close();
            return false
        };
        this.users.push(user);
        return true;
    }

    public exit(idUser: string): boolean {
        //Is it empty? if yes, kill the room
        if (this.users.length === 1) return room.rooms.delete(this.name);
        for (const index in this.users) {
            if (this.users[index].idUser !== idUser) continue;
            this.users.splice(Number(index), 1);
            return true;
        }
        return false;
    }

    public getCard(message: string) {
        this.users.forEach( x => {
            x.send(message)
        })
    }

    public getUsers = () => this.users;
}