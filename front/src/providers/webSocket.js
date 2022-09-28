export class webSocketMethods {
    #players;
    #mainPlayer;
    #mainName;
    #currentPlayer;
    setName = (name) => this.#mainName = name;

    firstData(data) {
        console.log("data: ", data)
        this.#currentPlayer = data.playerTurn;
        let main;
        const players = [];
        const names = [];

        data.players.forEach((player) => {
            if(player.name === this.#currentPlayer) player.isCurrent = true;
            if (this.#mainName === player.name) return main = player

            players.push(player);
            names.push(player.name)
        });

        this.#mainPlayer = main;
        this.#players = players;
        if(!this.#mainPlayer) {
            this.#mainPlayer = {
                cards: [],
                name: this.#mainName,
                bet: 0,
                valueA11: 0,
                valueA1: 0,
                finished: true
            }
            main = this.#mainPlayer
        }
        return { dealer: data.dealer, main: main, players: players }
    }

    stop(data) {
        const players = this.#players.map( player => {
            if(player.name === data.nextPlayerName) player.isCurrent = true;
            else player.isCurrent = false;
            return player;
        })
        const main = this.#mainPlayer;
        if(data.nextPlayerName === main.name) main.isCurrent = true;
        else main.isCurrent = false;
        return {data: main, players}
    }

    newCard(data) {
        console.log(data.nextPlayerName)
        const players = this.#players.map( player => {
            if(player.name === data.nextPlayerName) player.isCurrent = true;
            return player;
        })
        if (this.#mainPlayer.name === data.playerGame.name) {
            this.#mainPlayer = data.playerGame
            const main = this.#mainPlayer
            if(main.name === data.nextPlayerName) main.isCurrent = true;
            return { isMain: true, data: main, players }
        }
        this.#players = this.#players.map(player => {
            if(player.name === data.playerGame.name) return data.playerGame;
            return player;
        })
    
        return { isMain: false, players: players }
    }

    finishGame(data) {
        const whoWon = data.results.find(player => player.name === this.#mainName);
        this.#reset()
        return {
            dealer: data.dealerHand,
            whoWon: whoWon
        }
    }

    #reset() {
        this.#mainPlayer = [];
        this.#players = [];
    }

}

export const wsMethods = new webSocketMethods();
