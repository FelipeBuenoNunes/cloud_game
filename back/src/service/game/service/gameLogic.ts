import { randomInt } from "crypto";
import { dealer } from "../models/game/dealer";
import { playerGame } from "../models/game/playerGame";
import { playerGameToFront } from "../models/game/playerToFront";
import { resultPlayers } from "../models/game/result";
import { getCardResponse } from "../models/messageServer/getCard"

const suits = ["C", "H", "S", "D"];
const cardsValue = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Q", "J", "K", "A"];

const deckCards: string[][] = new Array<string[]>(56*4);
//forEach to generate the deck cars

suits.forEach((suit, idSuit) => {
    cardsValue.forEach((cardValue, idCard) => {
        const cardIndex = ((idSuit * cardsValue.length) + idCard)*4;
        let index = 0;
        //console.log(cardIndex)
        while(index < 4){
            deckCards[cardIndex+index] = [cardValue, suit] 
            index++;
        }
    })
});

export class logicGame {
    private players: playerGame;
    private deckCards: string[][];
    private qtdPlayers: number;
    private dealerHand: dealer = { cards: new Array<string[]>, value: 0 }

    constructor(usersId: string[]) {
        this.qtdPlayers = this.createPlayers(usersId); //create players
        this.shuffle(); //Random deck cards
        this.startGame();
    }

    private shuffle() {
        const cards = deckCards.slice(); //copy array
        cards.forEach((_, id) => {
            const randomId = randomInt(cards.length);
            [cards[id], cards[randomId]] = [cards[randomId], cards[id]];
        });
        this.deckCards = cards;
    }

    private createPlayers(playersId: string[]): number {
        if (playersId.length < 1) return 0;

        let qtdPlayers = 0;
        let currentPlayer: playerGame, firstPlayer: playerGame; //current and first player to do linked list

        //For each to do linked list
        playersId.forEach(playerId => {
            const newPlayer: playerGame = {
                id: playerId,
                cards: new Array<string[]>,
                bet: 0,
                finished: false,
                valueA1: 0,
                valueA11: 0,
                next: undefined
            }
            if (currentPlayer) currentPlayer.next = newPlayer;
            else firstPlayer = newPlayer;

            currentPlayer = newPlayer;
            qtdPlayers++;
        })
        currentPlayer!.next = firstPlayer!; //To do one circular structure
        this.players = firstPlayer!; // the first player start the game
        return qtdPlayers;
    }


    public startGame() {
        this.distributeCards();
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

    //private getPlayer = (id: string) => this.players.get(id);

    public getCard(userId: string): getCardResponse {
        if (this.players.finished) throw "User cannot get card";
        if (this.players.id !== userId) throw "User cannot get card now";

        this.players.cards.push(this.deckCards.pop()!); //Add card
        this.updateHand();

        const currentPlayer = this.players;
        const next = this.nextPlayer();
        return {
            playerGame: playerGameToFront(currentPlayer),
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
        for (let i = 0; i <= this.qtdPlayers; i++) {
            this.players = this.players.next!;
            if (!this.players.finished) return true;
        }
        return false;
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

            const playerWon = (valuePlayer > valueDealer && valuePlayer < 21) || (valueDealer > 21 && valuePlayer < valueDealer);
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

        return;
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
