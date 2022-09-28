import React, { useEffect, useState } from 'react';
import { Header } from '../Header';
import { ContainerDealer, ContainerPlayer, ContainerButtons } from './elements';
import { useUser } from '../../providers/user';
import { wsMethods } from '../../providers/webSocket';
import { get } from '../../functions/req';
import { useNavigate } from 'react-router-dom';

import ReactAudioPlayer from 'react-audio-player';
import Sound from 'react-sound';
import useSound from 'use-sound';


import startSound from '../../assets/sounds/start.mp3';
import winSound from '../../assets/sounds/win.mp3';
import loseSound from '../../assets/sounds/lose.mp3';
import loseAllSound from '../../assets/sounds/loseAll.mp3';
import drawSound from '../../assets/sounds/draw.mp3';


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

  const [clearTable, setClearTable] = useState(false);

  // state para renderizar botão aposta
  const [bet, setBet] = useState(false);

  //state value input (bet)
  const [valueInput, setValueInput] = useState('');

  // function sound
  const [onSound, setOnSound] = useState(false);
  // const PlaySound = (
  //   urlSound
  //   // handleSongLoading,
  //   // handleSongPlaying,
  //   // handleSongFinishedPlaying
  // ) => {
  //   const [isPlaying, setIsPlaying] = useState(false);
  //   return (
  //     <div>
  //       <button
  //         onclick={() => setIsPlaying(!isPlaying)}
  //       >
  //         {!isPlaying ? ' Play ' : ' Stop '}
  //       </button>
  //       <Sound
  //         url={urlSound}
  //         playStatus={isPlaying ? Sound.status.PLAYING : Sound.status.PLAYING}
  //         playFromPosition={300}
  //       // onLoading={handleSongLoading}
  //       // onPlaying={handleSongPlaying}
  //       // onFinishedPlaying={handleSongFinishedPlaying}
  //       />

  //     </div>
  //   );
  // }


  // sound test
  const arrSound = [startSound, winSound, loseSound, loseAllSound, drawSound];


  const [start] = useSound(startSound);
  const [win] = useSound(winSound);
  const [lose] = useSound(loseSound);
  const [loseAll] = useSound(loseAllSound);
  const [draw] = useSound(drawSound);
  // const BoopButton = () => {
  //   return <button onClick={play}>Boop!</button>;
  // };




  const functionsWs = new Map();

  functionsWs.set("first_data", (data) => {
    setModalStartRound(false);
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
    // console.log(`data finish game = ${JSON.stringify(data)}`)
    // console.log(`value aposta = ${data.dealerHand.value}`)
    console.log('quem ganhou = ', result.whoWon.whoWon);
    if (result.whoWon.whoWon === "PLAYER") {
      console.log('som');
      win();
    }
    if (result.whoWon.whoWon === "DEALER") {
      console.log('som');
      lose();
    }
    if (result.whoWon.whoWon === "DRAW") {
      console.log('som');
      draw();
    }
    setDealerHand(result.dealer.cards);
    setTimeout(() => {
      setModalEndRound(result.whoWon);
    }, 2000)
  })



  const connectWS = () => {
    const ws = new WebSocket(process.env.REACT_APP_WS, document.cookie.split("=")[1]);
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

    ws.onclose = () => {
      navigation("/")
    }

  };


  const ButtonSetBet = () => {
    get("/wallet/balance")
      .then(res => setBalance(res.balance))
      .catch(e => console.error(e))

    return (
      <section className='w-full h-full bg-BJgreen01 flex jflex-col justify-center items-center absolute' >
        <section className='flex flex-col justify-center items-center gap-y-4 ' >
          <div className='flex flex-col justify-center items-center gap-y-4 md:flex-row md:gap-x-4' >

            <div className='w-40 h-16 bg-blue-500 text-center font-bold text-2xl ' >Saldo: <br /> {balance} </div>

            <input className='w-40 h-16 text-orange-400 font-bold text-3xl' id="value-bet" type="number" min="1" defaultValue="50" max={balance || 0} placeholder='aposta' />

            <button
              className='w-40 h-16 bg-green-500 text-white text-2xl font-bold'
              onClick={() => {
                const valueInput = parseInt(document.getElementById('value-bet').value);
                if (valueInput > balance || valueInput < 0) return;
                setValueInput(valueInput)
                setBet(false);
                setModalStartRound(true);
                webSocket.send(JSON.stringify({
                  name: "start_round",
                  data: valueInput
                }))
              }} >Finalizar aposta</button>
          </div>
        </section>
      </section>
    );
  };


  const ButtonGetCards = () => {
    return (
      <section className={`w-full mx-auto p-4 bg-transparent flex flex-row justify-center items-center gap-x-1 text-BJwhite font-medium text-center text-2xl md:text-4xl [&>*]:bg-BJbrown`} >
        <button
          className=" active: max-w-[150px] w-[30%] "
          onClick={() => { webSocket.send(JSON.stringify({ "name": "stop" })) }}
        >
          parar
        </button>
        <button
          className="max-w-[150px] w-[30%] "
          onClick={() => { webSocket.send(JSON.stringify({ "name": "get_card" })) }}
        >
          pedir
        </button>
        <button
          disabled={balance < 2 * valueInput}
          className=" disabled:opacity-50 max-w-[150px] w-[30%] "
          onClick={() => { webSocket.send(JSON.stringify({ "name": "double_bet" })), setValueInput(2 * valueInput) }}
        >
          dobrar
        </button>
        {/* <button className="max-w-[150px] w-[30%] " onClick={() => { webSocket.send(JSON.stringify(startRound)) }} >bet</button> */}
      </section>
    );
  };

  const ModalStart = () => {

    useEffect(() => {
      if (modalStartRound) {
        start();
        // setTimeout(() => {
        //   setModalStartRound(false);
        // }, 20000);
      }
    }, [modalStartRound]);

    return (
      <section className='' >
        <div
          className={` InfoModal ${modalStartRound === true ? 'flex' : 'hidden'} absolute top-0 left-0  flex flex-col justify-center items-center z-10  w-screen h-screen backdrop-blur-sm bg-[#222]`} >
          <div className=' Container w-[50vh] h-[20vh] bg-BJgreen01 relative flex flex-col justify-center items-center gap-y-8 rounded-2xl'>
            <p className='text-white font-bold text-2xl' >Finalizando as apostas</p>
          </div>
        </div>
      </section>
    );
  };

  const ModalEnd = () => {
    const whoWon = {
      "PLAYER": `Você ganhou  ${valueInput}`,
      "DEALER": `Você perdeu  ${valueInput} `,
      "DRAW": `Empatou  ${valueInput} foi devolvido`,
    }
    useEffect(() => {
      // const result = wsMethods.finishGame(data)
      if (modalEndRound) {
        // console.log('quem ganhou = ', whoWon[modalEndRound.whoWon.whoWon]);
        setTimeout(() => {
          console.log('modalend round', modalEndRound);
          setModalEndRound(undefined);
          setBet(true);
        }, 5000);
      }
    }, [modalEndRound]);

    return (
      <section>
        <div className={` InfoModal ${modalEndRound ? "flex" : 'hidden'} absolute top-0 left-0  flex flex-col justify-center items-center z-10  w-screen h-screen backdrop-blur-sm bg-black/90`} >
          <div className=' Container w-[50vh] h-[50vh] bg-BJgreen01/60 relative flex flex-col justify-center items-center gap-y-8 ' >
            <p className='text-white font-bold text-2xl' >{modalEndRound && whoWon[modalEndRound.whoWon]}</p>
          </div>
        </div>
      </section>
    )
  };

  useEffect(() => {
    connectWS();
  }, []);

  get("/wallet/balance")
    .then(res => setBalance(res.balance))
    .catch(e => console.error(e));

  return (
    <>
      <section className="bg-boardMobile bg-no-repeat bg-cover object-contain bg-center w-screen h-screen flex flex-col md:bg-boardDesktop">
        <Header className={`h-[5%]`} arr />
        <ContainerDealer className={` md:mb-16`} arrCards={dealerHand} />
        <ContainerPlayer balance={balance} main={main} p1={players[0]} p2={players[1]} p3={players[2]} p4={players[3]} className={`h-`} />

        {bet
          ?
          <ButtonSetBet />
          :
          <ButtonGetCards />
        }

        <ModalStart />
        <ModalEnd />

        {/* <ReactAudioPlayer
          src="/songs/sounds/fichas-poker.mp3"
          autoPlay
          controls
          listenInterval={40000}
        /> */}

        {/* <PlaySound urlSound="../../assets/sounds/fichas-poker.mp3" /> */}

        {/* <BoopButton /> */}

      </section>
    </>
  );
};

export default Table;
