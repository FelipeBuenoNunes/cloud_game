import { playerToFront } from "../game/playerToFront";

export interface getCardResponse {
    playerGame: playerToFront
    nextPlayerName: string
}