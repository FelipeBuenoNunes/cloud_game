import { Component, useEffect, useState } from 'react';
import { Header } from '../Header';
import { ContainerDealer, ContainerPlayer, ContainerButtons } from './elements';
import { useUser } from '../../providers/user';
import { wsMethods } from '../../providers/webSocket';
import { get } from '../../functions/req';
import { useNavigate } from 'react-router-dom';

const Table = ({ route, children }) => {
  const navigation = useNavigate();
  const nameUser = useUser().bueno;
  wsMethods.setName(nameUser);
  //const { itemId, otherParam } = route.params;
  const [dealerHand, setDealerHand] = useState([]);
  const [main, setMain] = useState(undefined);
  const [players, setPlayers] = useState([]);
  const [webSocket, setWebSocket] = useState([]);
  const [balance, setBalance] = useState("");

  const [modalStartRound, setModalStartRound] = useState(false);
  const [modalEndRound, setModalEndRound] = useState(undefined);

  // state para aposta
  const [bet, setBet] = useState(false);

  const functionsWs = new Map();

  functionsWs.set("first_data", (data) => {
    setModalStartRound(false)
    const result = wsMethods.firstData(data);
    setMain(result.main);
    setPlayers(result.players);
    setDealerHand(result.dealer.cards)
  })

  functionsWs.set("new_card", (data) => {
    const result = wsMethods.newCard(data);
    result.isMain ? setMain(result.data) : setPlayers(result.data)
  })

  functionsWs.set("stop", (data) => {
    console.log(data.name);
  })

  // criar modal pequeno (baixo esquerda ou direita)
  functionsWs.set("error", (data) => {
    console.log(`erro data = ${data}`); //error criar um jeito de mostrar ao usuario e tratar a msg (colocar em pt-br)
  })

  functionsWs.set("finish_game", (data) => {
    const result = wsMethods.finishGame(data)
    setDealerHand(result.dealer.cards);
    setTimeout(() => {
      setModalEndRound(result.whoWon);
    }, 2000)
  })

  const connectWS = () => {
    const ws = new WebSocket(`ws://localhost:8080`, document.cookie.split("=")[1]);
    ws.binaryType = "blob";

    ws.onopen = () => {
      setWebSocket(ws);
      setBet(true)
    }

    ws.onmessage = (message) => {
      const event = JSON.parse(message.data)
      console.log(event)
      if (event.name !== "first_data" && event.name !== "new_card" && event.name !== "finish_game" && event.name !== "stop" && event.name !== "error") return;
      functionsWs.get(event.name)(event.data);
    }

    ws.onclose =() => {
      navigation("/")
    }

  };

  const startRound = {
    name: "start_round",
    data: 100
  }

  // BUTTONS
  // acept only posit values
  // get balance
  // não deixar entrar com aposta zero, ou sem apostar
  // o modal não esta ocerrendo no tempo de espera
  const ButtonSetBet = () => {
    get("/wallet/balance")
      .then(res => setBalance(res.balance))
      .catch(e => console.error(e))

    const [valueInput, setValueInput] = useState('');

    useEffect(() => {
      console.log(valueInput)
    }, [valueInput]);

    return (
      <section className='flex flex-col justify-center items-center gap-y-4 ' >
        <div className='flex flex-row justify-center items-center gap-x-4' >

          <div className='w-40 h-16 bg-blue-500 text-center font-bold text-2xl ' >balance: <br /> {balance} </div>

          <input className='w-40 h-16 text-orange-400 font-bold text-3xl' type="number" min="0" max={balance || 0} placeholder='bet' value={valueInput} onInput={(e) => { setValueInput(Math.trunc(e.target.value)) }} />

          <button
            className='w-40 h-16 bg-green-500 text-white text-2xl font-bold'
            onClick={() => {
              if (valueInput > balance) return;
              setBet(false);
              setModalStartRound(true);
              webSocket.send(JSON.stringify({
                name: "start_round",
                data: valueInput
              }))
            }} >finalize bet</button>
        </div>

      </section>
    );
  };


  const ButtonGetCards = () => {
    return (
      <section className={`w-full mx-auto p-4 bg-transparent flex flex-row justify-center items-center gap-x-1 text-BJwhite font-medium text-center text-2xl md:text-4xl [&>*]:bg-BJbrown`} >
        <button className="max-w-[150px] w-[30%] " onClick={() => { webSocket.send(JSON.stringify({ "name": "stop" })) }} >stop</button>
        <button className="max-w-[150px] w-[30%] " onClick={() => { webSocket.send(JSON.stringify({ "name": "get_card" })) }} >hit</button>
        <button className="max-w-[150px] w-[30%] " onClick={() => { webSocket.send(JSON.stringify({ "name": "double_bet" })) }} >double</button>
        {/* <button className="max-w-[150px] w-[30%] " onClick={() => { webSocket.send(JSON.stringify(startRound)) }} >bet</button> */}
      </section>
    );
  };

  // so pra saber o nome dos states
  // const [modalStartRound, setModalStartRound] = useState(false);
  // const [modalEndRound, setModalEndRound] = useState(false);
  const ModalStart = () => {

    useEffect(() => {
      if (modalStartRound)
        setTimeout(() => {
          setModalStartRound(false);
        }, 20000);
    }, [modalStartRound]);

    return (
      <section className='' >
        <div className={` InfoModal ${modalStartRound === true ? 'flex' : 'hidden'} absolute top-0 left-0  flex flex-col justify-center items-center z-10  w-screen h-screen backdrop-blur-sm bg-black/90`} >
          <div className=' Container w-[50vh] h-[50vh] bg-BJgreen01/60 relative flex flex-col justify-center items-center gap-y-8 ' >
            <p className='text-white font-bold text-2xl' >Finalizando as apostas</p>
          </div>
        </div>
      </section>
    );
  };

  const ModalEnd = () => {
    useEffect(() => {
      if (modalEndRound)
        setTimeout(() => {
          setModalEndRound(undefined);
          setBet(true);
        }, 5000);
    }, [modalEndRound]);

    return (
      <section className='' >
        <div className={` InfoModal ${modalEndRound ? "flex" : 'hidden'} absolute top-0 left-0  flex flex-col justify-center items-center z-10  w-screen h-screen backdrop-blur-sm bg-black/90`} >
          <div className=' Container w-[50vh] h-[50vh] bg-BJgreen01/60 relative flex flex-col justify-center items-center gap-y-8 ' >
            <p className='text-white font-bold text-2xl' >{modalEndRound && modalEndRound.whoWon}</p>
          </div>
        </div>
      </section>
    )
  };

  useEffect(() => {
    connectWS();
  }, []);

  return (
    <>
      <section className="bg-boardMobile bg-no-repeat bg-cover object-contain bg-center w-screen h-screen flex flex-col md:bg-boardDesktop">
        <Header className={`h-[5%] md:h-[10%]`} arr />
        <ContainerDealer className={`h-[10%] md:h-[15%] md:mb-16`} arrCards={dealerHand} />
        <ContainerPlayer main={main} p1={players[0]} p2={players[1]} p3={players[2]} p4={players[3]} className={`h-`} />

        {bet
          ?
          <ButtonSetBet />
          :
          <ButtonGetCards />
        }

        <ModalStart />
        <ModalEnd />

      </section>
    </>
  );
};

export default Table;
