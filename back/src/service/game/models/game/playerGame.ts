export interface playerGame {
    id: string
    name: string
    cards: string[][]
    bet: number
    valueA11: number
    valueA1: number
    finished: boolean
    next?: playerGame
}