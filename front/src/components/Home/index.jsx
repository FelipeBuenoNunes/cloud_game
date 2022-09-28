import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../../providers/user';
import { get } from '../../functions/req'
import { post } from '../../functions/req';

// import useSound from 'use-sound';
// import startSound from '../../assets/sounds/start.mp3';
// import winSound from '../../assets/sounds/win.mp3';
// import loseSound from '../../assets/sounds/lose.mp3';
// import loseAllSound from '../../assets/sounds/loseAll.mp3';
// import drawSound from '../../assets/sounds/draw.mp3';

const Home = () => {
  const navigation = useNavigate();
  const [balance, setBalance] = useState('');
  const [name, setName] = useState('');
  const { setBueno } = useUser();

  const exitButton = () => {
    document.cookie = "pachin-game/cookie" + "=" +
      ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
    navigation("/");
  }

  const getBalance = async () => {
    return get("/wallet/balance")
      .then(result => {
        setBalance(result.balance);
      })
      .catch(err => console.error(err));
  }

  useEffect(() => {
    getBalance();

    get("/infos")
      .then(res => {
        setName(res.name)
        setBueno(res.name);
      })
      .catch(err => console.error(err));

  }, []);

  const getToken = () => {
    post('/wallet/buy_token', { "amount": "50" })
      .then(res => res.success && getBalance())
      .catch(err => console.err(err));
  };

  const buttonPlay = () => {
    if (balance <= 0) return;
    navigation('/table');
  }

  return (
    <section className='w-full h-[100vh] flex'>
      <div className='h-[100vh] bg-[#910023] w-[48%] flex justify-around flex-col items-center rounded-r-[2rem]'>
        <div className='w-full flex justify-between px-20' >
          <button className='flex items-center text-white font-bold text-3xl' onClick={exitButton}>
            <img className="mr-3" src="/assets/arrow.svg" alt="arrow" />
            Sair
          </button>
          <button className='text-white text-3xl' onClick={getToken}>Comprar moedas</button>
        </div>
        <h1 className='text-white font-extrabold text-8xl' >{name}</h1>
        <div className='w-[16.5rem] h-[9.5rem] border-2 border-white rounded-[2.2rem] flex justify-center items-center' >
          <span className='text-white font-bold text-3xl'>Saldo:</span>
          <p className='text-white text-3xl ml-2'>{balance}</p>
        </div>
        <button className='bg-white w-[21rem] h-[4rem] text-[#1A1A32] text-3xl font-bold rounded-[1.2rem]' onClick={() => buttonPlay()}>JOGAR</button>
      </div>
      <div className='h-[100vh] w-[52%] flex items-center justify-center'>
        <img src="/assets/big-logo.svg" alt="logo" />
      </div>
    </section>
  )
}
export { Home };