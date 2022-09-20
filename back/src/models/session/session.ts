export interface Session {
    idUser: string
    name: string
    publicKey: string
    inGame: boolean
    gameSessionId?: string
}