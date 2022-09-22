import { useEffect, useState } from 'react';
import { Header } from '../Header';
import { ContainerDealer, ContainerPlayer, ContainerButtons } from './elements';
import { useUser } from '../../providers/user';
import { wsMethods } from '../../providers/webSocket';

// front/src/assets/table-02.png

const startRound = {
  name: "start_round",
  data: 100
}

const Table = ({ route, children }) => {
  const nameUser = useUser().bueno;
  wsMethods.setName(nameUser);
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
  const [players, setPlayers] = useState([]);
  const [namePlayers, setNamePlayers] = useState([]);
  const [webSocket, setWebSocket] = useState([]);

  const functionsWs = new Map();

  functionsWs.set("first_data", (data) => {
    const result = wsMethods.firstData(data);
    setMain(result.main);
    setPlayers(result.players);
    setNamePlayers(result.namePlayers);
    setDealerHand(result.dealer.cards)
  })

  functionsWs.set("new_card", (data) => {
    const result = wsMethods.newCard(data);
    result.isMain ? setMain(result.data): setPlayers(result.data)
  })
  
  functionsWs.set("stop", (data) => {
    console.log(data.name);
  })
  
  functionsWs.set("finish_game", (data) => {
    const result = wsMethods.finishGame(data)
    setDealerHand(result.dealer.cards);
    alert(`name: ${result.whoWon.name}, whoWon: ${result.whoWon.whoWon}`)
  })


  const connectWS = () => {
    const ws = new WebSocket(`ws://localhost:8080`, document.cookie.split("=")[1]);
    ws.binaryType = "blob";

    ws.onopen = () => {
      ws.send(JSON.stringify(startRound));
      setWebSocket(ws);
    }

    ws.onmessage = (message) => {
      const event = JSON.parse(message.data)
      if (event.name !== "first_data" && event.name !== "new_card" && event.name !== "finish_game") return;
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
        <ContainerPlayer main={main} p1={players[0]} p2={players[1]} p3={players[2]} p4={players[3]} className={``} />
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
