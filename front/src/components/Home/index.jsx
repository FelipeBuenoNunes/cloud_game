import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Header } from '../Header';
// import imageDragon from '/assets/image-dragon.png'
// style={{ backgroundImage: `url(/assets/image-dragon.png)` }} 

// body: JSON.stringify(credentials),
// headers: new Headers({
//   'Content-Type': 'application/json'
// })


const Home = () => {
  const navigation = useNavigate();
  const { userName, id } = useParams();
  const [balance, setBalance] = useState('');
  const [name, setName] = useState('');


  useEffect(() => {
    fetch('http://localhost:8080/wallet/balance', {
      method: 'GET',
      credentials: 'include',
    })
      .then(res => res.json())
      .then(result => {
        console.log(result);
        setBalance(result.balance);
        // localStorage.setItem('token', result.token);
      })
      .catch(err => setError(err.message));

    fetch('http://localhost:8080/infos', {
      method: 'GET',
      credentials: 'include',
    })
      .then(res => res.json())
      .then(result => {
        console.log(result);
        setName(result.name);
        // localStorage.setItem('token', result.token);
      })
      .catch(err => setError(err.message));
  },);

  const getToken = () => {
    fetch('http://localhost:8080/wallet/buy_token', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        "amount": "100"
      }),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
      .then(res => res.status === 200 ? setBalance(balance + 100) : console.log('erro no buy token'))
      .catch(err => setError(err.message));
  };

  // const connectWS = () => {
  //   // cookie=value; pegase apenas o value do cookie.
  //   const ws = new WebSocket(`wss://localhost:8080`, { Header: { "auth": document.cookie.split("=")[1] } });
  //   ws.binaryType = "blob";
  //   // Log socket opening and closing
  //   ws.addEventListener("open", event => {
  //     console.log("Websocket connection opened");
  //     // navigation
  //   });
  //   // ws.onopen = (e) => { socket.send("My name is John") };
  // };

  return (
    <section className='bg-[#ffdab9] w-screen h-screen' >
      <Header className={`h-[5%] md:h-[10%]`} />

      <main className=' w-full h-[95%] md:h-[90%] flex flex-col justify-center items-center' >
        <div
          style={{ backgroundImage: `url(/assets/image-dragon.png)`, backgroundRepeat: "no-repeat", backgroundSize: 'cover' }}
          className={` w-[50vh] h-[50vh] max-w-[90%] flex flex-col justify-center items-center gap-y-8`} >

          <div className='bg-blue-400 text-white w-[100px] px-2 gap-y-4' >
            <p>{balance}</p>
            <p>{name}</p>
          </div>
          <button onClick={getToken} className='text-yellow-300 text-2xl bg-BJbrown/60 px-4 py-2' >nos der dinheiro</button>

          <div className='backdrop-blur-[2px] bg-black/20 w-[50vh] h-[50vh] max-w-[90%] flex flex-col justify-center items-center gap-y-8' >
            <h1 className=' text-BJwhite font-bold text-4xl' >Dragon Jack</h1>
            <button className='bg-NTgreenDark text-BJwhite font-bold text-3xl rounded-lg px-4 py-2' onClick={() => { navigation('/table') }} >JOGAR</button>
          </div>

        </div>
      </main>
    </section>
  )
}
// bg-gradient-to-r from-green-300 via-green-500 to-green-700
export { Home };