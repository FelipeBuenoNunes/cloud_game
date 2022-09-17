import { randomUUID } from "crypto";
import { playerBet } from "../models/game/playerBet";
import { patternMessage } from "../models/messageServer/patterResponse";
import { ISocket } from "../models/wSocket";
import { logicGame } from "./gameLogic";

export class room {
    private static rooms = new Map<string, room>();

    //Join room and return id
    public static joinRoom(player: ISocket): string {
        for (let [_, currentRoom] of room.rooms) {
            if (currentRoom.qtdPlayers < 5) {
                currentRoom.enter(player);
                return currentRoom.id;
            };
        }
        const newRoom = new room(player);
        return newRoom.id;
    }

    public static getRoomById = (id: string) => this.rooms.get(id);

    //*********************Instace methods*********************\\

    private id: string;
    private qtdPlayers: number = 1;
    private users: ISocket[];
    private game: logicGame;

    constructor(user: ISocket) {
        this.users = [user]; //first user
        this.id = randomUUID();
        this.game = new logicGame();
        room.rooms.set(this.id, this);
    }

    private enter(user: ISocket): boolean {
        //If the room is full, close the connection
        if (this.qtdPlayers >= 5) {
            user.close();
            return false
        };
        this.users.push(user);
        this.qtdPlayers++;

        return true;
    }

    public async placeBet(player: playerBet) {
        if (await this.game.checkInPlayer(player)) {
            this.emitAll({
                name: "datas",
                data: await this.game.generateInitSetup()
            });
        }
    }

    public exit(idUser: string): boolean {
        //Is it empty? if yes, kill the room
        if (this.qtdPlayers === 1) return room.rooms.delete(this.id);
        for (const index in this.users) {
            if (this.users[index].idUser !== idUser) continue;
            this.users.splice(Number(index), 1);
            this.qtdPlayers--;
            return true;
        }
        return false;
    }

    public async getCard(user: string) {
        const getCardResponse = await this.game.getCard(user);
        this.emitAll({
            name: "get_card",
            data: getCardResponse
        });
        if(getCardResponse.nextPlayerId === "") this.finishRound();
    }

    public async doubleBet(user: string) {
        const getCardResponse = await this.game.doubleBet(user);
        this.emitAll({
            name: "get_card",
            data: getCardResponse
        })
        if(getCardResponse.nextPlayerId === "") this.finishRound();
    }
    
    private emitAll<Type>(message: patternMessage<Type>) {
        this.users.forEach(user => {
            user.send(JSON.stringify(message));
        })
    }

    private finishRound() {
        const result = this.game.finishedGame()
        this.emitAll({
            name: "finish_game",
            data: result
        });
    }


    public getUsers = () => this.users;
}