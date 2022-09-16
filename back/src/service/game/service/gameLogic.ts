import { randomInt } from "crypto";
import { playerGame } from "../models/game/playerGame";
import { playerGameToFront } from "../models/game/playerToFront";
import { getCardResponse } from "../models/response/getCard"

const suits = ["C", "H", "S", "D"];
const cardsValue = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Q", "J", "K", "A"];

const deckCards: string[][] = new Array<string[]>(56);
//forEach to generate the deck cars
suits.forEach((suit, idSuits) => {
    const cont = idSuits * cardsValue.length
    cardsValue.forEach((cardValue, id) => deckCards[cont + id] = [cardValue, suit]);
});

export class logicGame {
    private embaralha() {
        const cards = deckCards.slice();
        cards.forEach((_, id) => {
            const randomId = randomInt(cards.length);
            [cards[id], cards[randomId]] = [cards[randomId], cards[id]];
        });
        this.deckCards = cards;
    }

    private createPlayers(players: string[]): number {
        if(players.length < 1) return 0;
        
        players = players.reverse(); // reverse players forever first start
        let qtdPlayers = 0;
        let currentPlayer: playerGame, firstPlayer: playerGame; //current and first player to do linked list

        //For each to do linked list
        players.forEach(playerId => {
            const newPlayer: playerGame = {
                id: playerId,
                cards: new Array<string[]>,
                bet: 0,
                finished: false,
                valueA1:0,
                valueA11:0,
                next: undefined
            }
            if(currentPlayer) newPlayer.next = currentPlayer;
            else firstPlayer = newPlayer;
            
            currentPlayer = newPlayer;
            qtdPlayers++;
        })
        currentPlayer!.next = firstPlayer!; //To do one circular structure
        this.players = firstPlayer!; // the first player start the game
        return qtdPlayers;
    }

    private players: playerGame;
    private deckCards: string[][];
    private qtdPlayers: number;

    constructor(usersId: string[]) {
        this.qtdPlayers = this.createPlayers(usersId); //create players
        this.embaralha(); //Random deck cards
        console.log(this.deckCards)
    }

    private updateHand(players: playerGame) {
        const newCard = players.cards[players.cards.length - 1]
        if (newCard[0] === "A") {
            players.valueA1 += 1;
            players.valueA11 += 11;
        } else {
            const num = Number(newCard[0])
            const value = isNaN(num) ? 10 : num;
            players.valueA1 += value;
            players.valueA11 += value;
        }

        if (players.valueA1 >= 21) players.finished = true;
    }

    private nextPlayer() { 
        for(let i = 0; i <= 5; i++) {
            this.players = this.players.next!;
            if(!this.players.finished) return true;
        }
        return false;
    }

    //private getPlayer = (id: string) => this.players.get(id);

    public getCard(userId: string): getCardResponse {
        if (this.players.finished) throw "User cannot get card";

        this.players.cards.push(this.deckCards.pop()!); //Add card
        this.updateHand(this.players);
        return {
            playerGame: playerGameToFront(this.players),
            nextPlayerId: this.nextPlayer() ? this.players.id : ""
        }
    }
}
