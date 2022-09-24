import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Header } from '../Header';
import { useUser } from '../../providers/user';

const Home = () => {
  const navigation = useNavigate();
  const { userName, id } = useParams();
  const [balance, setBalance] = useState('');
  const [name, setName] = useState('');
  const { setBueno } = useUser();
  const [activeMenu, setActiveMenu] = useState(false);


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
        setName(result.name);
        setBueno(result.name);
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

  return (
    <section className='bg-BJgreen01 w-full h-screen' >
      <Header className={`h-[5%] md:h-[10%]`} />

      <button
        className='text-5xl leading-[3px] text-white absolute top-0 right-2 md:leading-10'
        onClick={() => {
          activeMenu === false ? setActiveMenu(true) : setActiveMenu(false)
        }} >
        ...
      </button>

      <div className={` InfoModal ${activeMenu === true ? 'flex' : 'hidden'} absolute top-0 left-0  flex flex-col justify-center items-center z-10  w-screen h-screen backdrop-blur-sm bg-black/90`} >
        <div className=' Container w-[50vh] h-[50vh] bg-BJgreen01/60 relative flex flex-col justify-center items-center gap-y-8 ' >
          <button
            className=' ButtonClose absolute top-0 right-0 bg-red-500 w-[10%] h-[10%]'
            onClick={() => {
              activeMenu === false ? setActiveMenu(true) : setActiveMenu(false)
            }}
          >
            X
          </button>

          <div className=' ContentText bg-BJbrown text-white text-3xl w-[80%] px-4 py-2 gap-y-4 rounded-lg ' >
            <p>balance: {balance}</p>
            <p>name: {name}</p>
          </div>

          <button onClick={getToken} className='text-yellow-300 text-2xl bg-BJbrown/60 px-4 py-2 rounded-lg ' >comprar moedas</button>
        </div>
      </div>

      <main className=' w-full h-[95%] md:h-[90%] flex flex-col justify-center items-center' >
        <div
          style={{ backgroundImage: `url(/assets/image-dragon.png)`, backgroundRepeat: "no-repeat", backgroundSize: 'cover' }}
          className={` w-[50vh] h-[50vh] max-w-[90%] flex flex-col justify-center items-center gap-y-8`} >



          <div className=' ContainerContent backdrop-blur-[2px] bg-black/20 w-[50vh] h-[50vh] max-w-[90%] flex flex-col justify-center items-center gap-y-8' >
            <h1 className=' text-BJwhite font-bold text-4xl' >Dragon Jack</h1>
            <button className=' PlayButton bg-NTgreenDark text-BJwhite font-bold text-3xl rounded-lg px-4 py-2' onClick={() => { navigation('/table') }} >JOGAR</button>
          </div>

        </div>
      </main>
    </section >
  )
}
export { Home };