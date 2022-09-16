import { playerGame } from "./playerGame"

export interface playerToFront {
    cards: string[][]
    bet: number
    valueA11: number
    valueA1: number
    finished: boolean
}

export function playerGameToFront(player: playerGame): playerToFront {
    return {
        cards: player.cards,
        bet: player.bet,
        valueA11: player.valueA11,
        valueA1: player.valueA1,
        finished: player.finished
    }
}