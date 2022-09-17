import sessionServices from "../../../session/sessionServices"
import { playerGame } from "./playerGame"

export interface playerToFront {
    cards: string[][]
    name: string
    bet: number
    valueA11: number
    valueA1: number
    finished: boolean
}

export async function playerGameToFront(player: playerGame): Promise<playerToFront> {
    return {
        cards: player.cards,
        name: (await sessionServices.getWithCookie(player.id))!.get().name,
        bet: player.bet,
        valueA11: player.valueA11,
        valueA1: player.valueA1,
        finished: player.finished
    }
}

export async function playerOffGame(idPlayer: string): Promise<Partial<playerToFront>> {
    return { "name" :  (await sessionServices.getWithCookie(idPlayer))!.get().name }
}
