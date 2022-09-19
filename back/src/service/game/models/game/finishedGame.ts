import { dealer } from "./dealer";
import { resultPlayers } from "./result";

export interface finishedGame {
    dealerHand: dealer
    results: resultPlayers[]
}