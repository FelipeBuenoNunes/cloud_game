import { randomInt } from "crypto";
import { dealer } from "../models/game/dealer";
import { playerBet } from "../models/game/playerBet";
import { playerGame } from "../models/game/playerGame";
import { playerGameToFront, playerToFront } from "../models/game/playerToFront";
import { resultPlayers } from "../models/game/result";
import { gameMessage } from "../models/messageServer/gameRunMessage";
import { getCardResponse } from "../models/messageServer/getCard"

const suits = ["C", "H", "S", "D"];
const cardsValue = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Q", "J", "K", "A"];

const deckCards: string[][] = new Array<string[]>(56*4);
//forEach to generate the deck cars

suits.forEach((suit, idSuit) => {
    cardsValue.forEach((cardValue, idCard) => {
        const cardIndex = ((idSuit * cardsValue.length) + idCard)*4;
        let index = 0;
        while(index < 4){
            deckCards[cardIndex+index] = [cardValue, suit] 
            index++;
        }
    })
});

// function waitingSeconds(seconds: number) {
//     return new Promise()
// }

export class logicGame {
    private players: playerGame;
    private deckCards: string[][];
    private qtdPlayers: number;
    private dealerHand: dealer = { cards: new Array<string[]>, value: 0 }
    private confirmedPlayers: playerBet[] = [];
    public isGameRunning: boolean = false;

    constructor() {
        this.shuffle(); //Random deck cards
    }

    private shuffle() {
        const cards = deckCards.slice(); //copy array
        cards.forEach((_, id) => {
            const randomId = randomInt(cards.length);
            [cards[id], cards[randomId]] = [cards[randomId], cards[id]];
        });
        this.deckCards = cards;
    }

    public checkInPlayer(player: playerBet): Promise<true>|null {
        this.confirmedPlayers.push(player);
        if(this.confirmedPlayers.length === 1) {
            return new Promise((resolve: any) => {
                setTimeout( async() => {
                    this.startRound();
                    resolve(true);
                }, 5000)
            })
        }
        return null;
    }

    private startRound() {
        this.isGameRunning = true;
        this.createPlayers();
        this.distributeCards();
    }

    private createPlayers() {
        this.qtdPlayers = 0;
        let currentPlayer: playerGame, firstPlayer: playerGame; //current and first player to do linked list

        //For each to do linked list
        this.confirmedPlayers.forEach(player => {
            const newPlayer: playerGame = {
                id: player.idPlayer,
                cards: new Array<string[]>,
                bet: player.bet,
                finished: false,
                valueA1: 0,
                valueA11: 0,
                next: undefined
            }
            if (currentPlayer) currentPlayer.next = newPlayer;
            else firstPlayer = newPlayer;

            currentPlayer = newPlayer;
            this.qtdPlayers++;
        })
        currentPlayer!.next = firstPlayer!; //To do one circular structure
        this.players = firstPlayer!; // the first player start the game
    }

    private distributeCards() {
        for (let i = 0; i < this.qtdPlayers; i++) {
            this.players.cards.push(this.deckCards.pop()!);
            this.updateHand();
            this.players.cards.push(this.deckCards.pop()!);
            this.updateHand();
            this.players = this.players.next!
        }
        this.dealerHand.cards.push(...this.deckCards.splice(this.deckCards.length - 2, this.deckCards.length - 1)!);
    }

    public async generateInitSetup(): Promise<gameMessage> {
        const players: playerToFront[] = []
        for(let i = 0; i < this.qtdPlayers; i++) {
            players.push(await playerGameToFront(this.players));
            this.players = this.players.next!;
            console.log(this.players)
        }
        return {
            isRunning: true, 
            playerTurn: players[0].name,
            players: players,
            dealer: this.dealerHand,
        }        
    }

    //private getPlayer = (id: string) => this.players.get(id);

    public async getCard(userId: string): Promise<getCardResponse> {
        if (this.players.finished) throw "User cannot get card";
        if (this.players.id !== userId) throw "User cannot get card now";

        this.players.cards.push(this.deckCards.pop()!); //Add card
        this.updateHand();

        const currentPlayer = this.players;
        const next = this.nextPlayer();
        return {
            playerGame: await playerGameToFront(currentPlayer),
            nextPlayerId: next ? this.players.id : ""
        }
    }

    private updateHand(players = this.players) {
        let hasCard11 = players.valueA1 !== players.valueA11; //Is there an ÁS?
        const valueNewCard = this.valueCard(players.cards[players.cards.length - 1][0]); //get value card

        players.valueA1 += valueNewCard[0];
        players.valueA11 += (!hasCard11 && valueNewCard.length > 1) ? valueNewCard[1] : valueNewCard[0];

        if (players.valueA1 >= 21) players.finished = true;
    }

    private valueCard(card: string): number[] {
        if (card === "A") return [1, 11];
        const num = Number(card)
        return [isNaN(num) ? 10 : num];
    }

    private nextPlayer() {
        if(!this.players.finished) return true;
        this.players = this.players.next!;
        return !this.players.finished;
    }

    public async doubleBet(userId: string): Promise<getCardResponse> {
        if (this.players.finished) throw "User cannot get card";
        if (this.players.id !== userId) throw "User cannot get card now";

        this.players.cards.push(this.deckCards.pop()!); //add new card
        this.updateHand();
        this.players.finished = true;
        this.players.bet *= 2; //double bet

        const currentPlayer = this.players;
        const next = this.nextPlayer();
        return {
            playerGame: await playerGameToFront(currentPlayer),
            nextPlayerId: next ? this.players.id : ""
        }
    }


    public finishedGame() {
        this.dealer();
        return this.whoWon();
    }

    private whoWon(): resultPlayers[] {
        const result = new Array<resultPlayers>(this.qtdPlayers);
        for (let i = 0; i < this.qtdPlayers; i++) {
            const valuePlayer = (this.players.valueA11 >= this.players.valueA1) ?
                this.players.valueA11 : this.players.valueA1;
            const valueDealer = this.dealerHand.value;

            const playerWon = (valuePlayer > valueDealer && valuePlayer <= 21) || (valueDealer > 21 && valuePlayer < valueDealer);
            result[i] = {
                idUser: this.players.id,
                playerWon: (playerWon) ? "PLAYER" : (valuePlayer === valueDealer) ? "DRAW" : "DEALER"
            }
            this.players = this.players.next!;
        }

        return result
    }

    private dealer() {
        const minDealer = this.minDealer();
        while (this.dealerContinues(minDealer))
            this.dealerHand.cards.push(this.deckCards.pop()!);
    }

    private minDealer() {
        for (let i = 0; i < this.qtdPlayers; i++) {
            const v11 = (this.players.valueA11 <= 21 && this.players.valueA11 > 17);
            const v1 = (this.players.valueA1 <= 21 && this.players.valueA1 > 17);
            if (v11 || v1) return 17;
            this.players = this.players.next!;
        }
        return 0;
    }

    private dealerContinues(minDealer: number): boolean {
        let valueA1 = 0, valueA11 = 0;
        this.dealerHand.cards.forEach(card => {
            const valueCard = this.valueCard(card[0]);
            valueA1 += valueCard[0];
            valueA11 += (valueA1 === valueA11 && valueCard.length > 1) ? valueCard[1] : valueCard[0];
        })
        this.dealerHand.value = (valueA11 < 21) ? valueA11 : valueA1;
        return !(valueA1 >= minDealer || valueA11 >= 18);
    }
}
