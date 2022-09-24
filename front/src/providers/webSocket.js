export class webSocketMethods {
    #players;
    #mainPlayer;
    #mainName;
    setName = (name) => this.#mainName = name;

    firstData(data) {
        console.log("data: ", data)
        let main;
        const players = [];
        const names = [];

        data.players.forEach((player) => {
            if (this.#mainName === player.name) return main = player

            players.push(player);
            names.push(player.name)
        });

        this.#mainPlayer = main;
        this.#players = players;
        console.log("old: ", this.#mainPlayer)
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
            console.log("new: ", this.#mainPlayer)
        }
        
        return { dealer: data.dealer, main: main, players: players, namePlayers: names }
    }

    newCard(data) {
        if (this.#mainPlayer.name === data.playerGame.name) {
            this.#mainPlayer = data.playerGame
            console.log(this,this.#mainPlayer)
            return { isMain: true, data: this.#mainPlayer }
        }
        this.#players = this.#players.map(player => {
            if(player.name === data.playerGame.name) return data.playerGame;
            return player;
        })
    
        return { isMain: false, data: this.#players }
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
