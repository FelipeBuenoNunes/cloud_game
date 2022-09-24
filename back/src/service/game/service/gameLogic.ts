import { randomInt } from "crypto";
import { Tochinko } from "../../contract/tochinko";
import sessionServices from "../../session/sessionServices";
import { dealer } from "../models/game/dealer";
import { finishedGame } from "../models/game/finishedGame";
import { finishedGameData } from "../models/game/finishedGameData";
import { playerBet } from "../models/game/playerBet";
import { playerGame } from "../models/game/playerGame";
import { playerGameToFront, playerToFront } from "../models/game/playerToFront";
import { resultPlayers } from "../models/game/result";
import { errorMessage, InsufficientMoney } from "../models/messageServer/errorMessage";
import { gameMessage } from "../models/messageServer/gameRunMessage";
import { getCardResponse } from "../models/messageServer/getCard"
import { nextPlayer } from "../models/messageServer/nextPlayer";
import { room } from "./room";

const suits = ["C", "H", "S", "D"];
const cardsValue = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Q", "J", "K"];

const deckCards: string[][] = new Array<string[]>(52 * 4);

//forEach to generate the deck cars
suits.forEach((suit, idSuit) => {
    cardsValue.forEach((cardValue, idCard) => {
        const cardIndex = ((idSuit * cardsValue.length) + idCard) * 4;
        let index = 0;
        while (index < 4) {
            deckCards[cardIndex + index] = [cardValue, suit]
            index++;
        }
    })
});

export class logicGame {
    private players: playerGame;
    private deckCards: string[][];
    private qtdPlayers: number;
    private dealerHand: dealer = { cards: new Array<string[]>, value: 0 }
    private confirmedPlayers: playerBet[] = [];
    public isGameRunning: boolean = false;
    private timeToActionPlayer: NodeJS.Timeout;

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

    public checkInPlayer(player: playerBet): Promise<true> | null {
        if(this.isGameRunning) return null; //todo
        this.confirmedPlayers.push(player);
        if (this.confirmedPlayers.length === 1) {
            return new Promise((resolve: any) => {
                setTimeout(async () => {
                    this.startRound();
                    resolve(true);
                }, 5000)
            })
        }
        return null
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
                name: player.name,
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
        for (let i = 0; i < this.qtdPlayers; i++) {
            players.push(await playerGameToFront(this.players));
            this.players = this.players.next!;
        }
        //this.actionPlayer(40);
        return {
            isRunning: true,
            playerTurn: players[0].name,
            players: players,
            dealer: this.showFirstDealerCard(this.dealerHand),
        }
    }

    private showFirstDealerCard(currentDealer: dealer): dealer {
        let value: number = Number(currentDealer.cards[0][0])
        if (isNaN(value))
            value = currentDealer.cards[0][0] === "A" ? 11 : 10

        return {
            cards: [currentDealer.cards[0]],
            value: value
        }
    }

    //private getPlayer = (id: string) => this.players.get(id);

    public async getCard(userId: string): Promise<getCardResponse> {
        if (this.players.finished) throw "User cannot get card";
        if (this.players.id !== userId) throw "User cannot get card now";

        this.players.cards.push(this.deckCards.pop()!); //Add card
        this.updateHand();
        this.hasCard();

        const currentPlayer = this.players;
        const next = await this.nextPlayer();
        return {
            playerGame: await playerGameToFront(currentPlayer),
            nextPlayerName: next ? this.players.name : ""
        }
    }

    private hasCard() {
        if(this.deckCards.length === 0) {
            this.shuffle();
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

    private async nextPlayer() {
        await this.actionPlayer(5);
        if (!this.players.finished) return true;
        this.players = this.players.next!;
        if(this.players.finished) {
            clearTimeout(this.timeToActionPlayer);
        }
        return !this.players.finished;
    }

    public async doubleBet(userId: string): Promise<getCardResponse | errorMessage> {
        if (this.players.finished) throw "User cannot get card";
        if (this.players.id !== userId) throw "User cannot get card now";
        if (this.players.cards.length > 2) throw "User cannot double bet";
        if (!await this.couldDoBet(this.players.id, (this.players.bet*2))) return InsufficientMoney

        this.players.cards.push(this.deckCards.pop()!); //add new card
        this.updateHand();
        this.players.finished = true;
        this.players.bet *= 2; //double bet

        const currentPlayer = this.players;
        const next = await this.nextPlayer();
        return {
            playerGame: await playerGameToFront(currentPlayer),
            nextPlayerName: next ? this.players.name : ""
        }
    }

    public async stop(userId: string): Promise<nextPlayer> {
        if (this.players.finished) throw "user cannot stop now";
        if (this.players.id !== userId) throw "user cannot stop now";

        this.players.finished = true;
        const next = await this.nextPlayer();
        return {
            nextPlayerName: next ? this.players.name : ""
        }
    }

    public finishedGame() {
        this.dealer();
        this.isGameRunning = false;
        const whoWon =  this.whoWon();
        this.resetGame();
        return whoWon;
    }

    private resetGame() {
        this.confirmedPlayers = [];
        this.dealerHand.cards = [];
        this.dealerHand.value = 0;
    }

    private whoWon(): finishedGame {
        const result = new Array<resultPlayers>(this.qtdPlayers);
        const paymentsData: finishedGameData[] = [];//object to payment players
        for (let i = 0; i < this.qtdPlayers; i++) {
            const valuePlayer = (this.players.valueA11 <= 21) ? this.players.valueA11 : this.players.valueA1;
            const valueDealer = this.dealerHand.value;
            
            const playerWon = (valuePlayer > valueDealer && valuePlayer <= 21) || (valueDealer > 21 && valuePlayer < valueDealer);
            result[i] = {
                name: this.players.name,
                whoWon: (playerWon) ? "PLAYER" : (valuePlayer === valueDealer) ? "DRAW" : "DEALER"
            }

            //object to payment players
            if (result[i].whoWon !== "DRAW")
                paymentsData.push({
                    player: this.players.id,
                    playerWon: result[i].whoWon === "PLAYER",
                    value: this.players.bet
                });

            this.players = this.players.next!;
        }
        this.paymentBet(paymentsData);
        return {
            dealerHand: {
                cards: this.dealerHand.cards,
                value: this.dealerHand.value
            },
            results: result
        }
    }

    private dealer() {
        const minDealer = this.minDealer();
        while (this.dealerContinues(minDealer)) {
            this.dealerHand.cards.push(this.deckCards.pop()!);
        }
    }

    private minDealer() {
        let valueCardPlayer = 0;
        for (let i = 0; i < this.qtdPlayers; i++) {
            const valuePlayer = (this.players.valueA11 <= 21) ? this.players.valueA11 : this.players.valueA1
            if(valuePlayer <= 21 && valuePlayer > valueCardPlayer) valueCardPlayer = valuePlayer;
            this.players = this.players.next!;
        }
        return (valueCardPlayer >= 17) ? 17 : valueCardPlayer;
    }

    private dealerContinues(minDealer: number): boolean {
        let valueA1 = 0, valueA11 = 0;
        this.dealerHand.cards.forEach(card => {
            const valueCard = this.valueCard(card[0]);
            valueA1 += valueCard[0];
            valueA11 += (valueA1 === valueA11 && valueCard.length > 1) ? valueCard[1] : valueCard[0];
        })
        this.dealerHand.value = (valueA11 < 21) ? valueA11 : valueA1;
        return !(valueA1 >= minDealer || valueA11 >= 17);
    }

    //Function to payments all bets
    private async paymentBet(finishedsData: finishedGameData[]) {
        for (let finishedData of finishedsData) {
            const publicKey = (await sessionServices.getWithCookie(finishedData.player))!.get().publicKey;
            if (finishedData.playerWon) await Tochinko.mintToken(publicKey, finishedData.value); //"dealer" pay to the player
            else await Tochinko.burntoken(publicKey, finishedData.value); //player pay to the "dealer"
        }
    }

    public async couldDoBet(idUser: string, possibleBet: number): Promise<boolean> {
        const publicKey = (await sessionServices.getWithCookie(idUser))!.get().publicKey;
        return possibleBet <= await Tochinko.getBalance(publicKey);
    }

    private async actionPlayer(seconds: number) {
        clearTimeout(this.timeToActionPlayer);
        const roomId = (await sessionServices.getWithCookie(this.players.id))?.get().gameSessionId!
        console.log((await sessionServices.getWithCookie(this.players.id))?.get())
        this.timeToActionPlayer = setTimeout(() => {
            room.getRoomById(roomId)!.
                stop(this.players.id);
            
        }, seconds*1000)
    }

}
