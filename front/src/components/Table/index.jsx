import { useEffect, useState } from 'react';
import { Header } from '../Header';
import { ContainerDealer, ContainerPlayer, ContainerButtons } from './elements';
import { useUser } from '../../providers/user';


// front/src/assets/table-02.png

const startRound = {
  name: "start_round",
  data: 100
}

const Table = ({ route, children }) => {
  const nameUser = useUser().bueno;
  //const { itemId, otherParam } = route.params;
  const [dealerHand, setDealerHand] = useState([
    ["A", "H"],
    ["A", "H"],
    ["A", "S"],
    ["A", "C"],
    ["A", "D"],
    ["A", "H"],
    ["A", "S"],
    ["A", "C"],
    ["A", "D"],
    ["A", "H"],
    ["A", "S"],
  ]);
  const [main, setMain] = useState(undefined);
  const [players, setPlayers] = useState(new Map());
  const [namePlayers, setNamePlayers] = useState([]);
  const [webSocket, setWebSocket] = useState([]);

  const functionsWs = new Map();

  functionsWs.set("first_data", (data) => {
    setDealerHand(data.dealer.cards)
    let main;
    const _players = [];

    data.players.forEach((player, index) => {
      if (nameUser === player.name) {
        main = player
      } else {
        _players.push(player);
      }
    });
    setMain(main);
    const playersCurrent = new Map();
    _players.forEach(player => {
      playersCurrent.set(player.name, player)
    })
    setPlayers(playersCurrent);
    console.log("PLAYERSSS:", players)
    setNamePlayers(_players.map(player => player.name));
  })

  functionsWs.set("get_card", (data) => {
    if (nameUser === data.playerGame.name) {
      setMain(data.playerGame);
      return;
    }
    players.set(data.playerGame.name, data.playerGame);
    setPlayers(players);
  })

  functionsWs.set("finish_game", (data) => {
    setDealerHand(data.dealerHand.cards);
  })

  const connectWS = () => {
    //console.log('cookie value = ' + document.cookie.split("=")[1]);
    const ws = new WebSocket(`ws://localhost:8080`, document.cookie.split("=")[1]);
    ws.binaryType = "blob";

    ws.onopen = () => {
      console.log("OPEN");
      ws.send(JSON.stringify(startRound));
      setWebSocket(ws);
    }

    ws.onmessage = (message) => {
      const event = JSON.parse(message.data)
      console.log(event)
      if (event.name !== "first_data" && event.name !== "get_card" && event.name !== "finish_game") return;
      functionsWs.get(event.name)(event.data);
    }

  };

  useEffect(() => {
    connectWS();
  }, []);

  return (
    <>
      <section className="bg-boardMobile bg-no-repeat bg-cover object-contain bg-center w-screen h-screen flex flex-col md:bg-boardDesktop">
        <Header className={`h-[5%] md:h-[10%]`} arr />
        <ContainerDealer className={`h-[10%] md:h-[15%] md:mb-16`} arrCards={dealerHand} />
        <ContainerPlayer main={main} p1={players.get(namePlayers[0])} p2={players.get(namePlayers[1])} p3={players.get(namePlayers[2])} p4={players.get(namePlayers[3])} className={``} />
        {/* <ContainerButtons className={`h-[5%] md:h-[10%]`} wsSend={(wsSend)} /> */}
        <section className={`w-full mx-auto p-4 bg-transparent flex flex-row justify-center items-center gap-x-1 text-BJwhite font-medium text-center text-2xl md:text-4xl [&>*]:bg-BJbrown`} >
          <button className="max-w-[150px] w-[30%] " onClick={() => { webSocket.send(JSON.stringify({ "name": "stop" })) }} >stop</button>
          <button className="max-w-[150px] w-[30%] " onClick={() => { webSocket.send(JSON.stringify({ "name": "get_card" })) }} >hit</button>
          <button className="max-w-[150px] w-[30%] " onClick={() => { webSocket.send(JSON.stringify({ "name": "double_bet" })) }} >double</button>
        </section>
      </section>
    </>
  );
};

export default Table;
