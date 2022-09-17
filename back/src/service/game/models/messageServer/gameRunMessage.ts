import { playerToFront } from "../game/playerToFront"
import { dealer } from "../game/dealer"

export interface gameMessage {
    isRunning: boolean
    playerTurn: string
    players: Partial<playerToFront>[]
    dealer: dealer
}