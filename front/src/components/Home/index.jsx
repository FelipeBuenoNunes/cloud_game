import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../../providers/user';
import { get } from '../../functions/req'
import { post } from '../../functions/req';

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
    if(balance <= 0) return;
    navigation('/table');
  }

  return (
    <section className='w-full h-[100vh] flex'>
      <div className='h-[100vh] bg-[#910023] w-[48%] flex justify-around flex-col items-center'>
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

  // return (
  //   <section className='bg-BJgreen01 w-full h-screen' >
  //     <Header className={`h-[5%] md:h-[10%]`} />

  //     {/* button opem modal info player */}
  //     <button
  //       className='text-5xl leading-[3px] text-white absolute top-0 right-2 md:leading-10'
  //       onClick={() => {
  //         activeMenu === false ? setActiveMenu(true) : setActiveMenu(false)
  //       }} >
  //       ...
  //     </button>

  //     {/* modal info player */}
  //     <div className={` InfoModal ${activeMenu === true ? 'flex' : 'hidden'} absolute top-0 left-0  flex flex-col justify-center items-center z-10  w-screen h-screen backdrop-blur-sm bg-black/90`} >
  //       <div className=' Container w-[50vh] h-[50vh] bg-BJgreen01/60 relative flex flex-col justify-center items-center gap-y-8 ' >
  //         <button
  //           className=' ButtonClose absolute top-0 right-0 bg-red-500 w-[10%] h-[10%]'
  //           onClick={() => {
  //             activeMenu === false ? setActiveMenu(true) : setActiveMenu(false)
  //           }}
  //         >
  //           X
  //         </button>

  //         <div className=' ContentText bg-BJbrown text-white text-3xl w-[80%] px-4 py-2 gap-y-4 rounded-lg ' >
  //           <p>balance: {balance}</p>
  //           <p>name: {name}</p>
  //         </div>

  //         <button onClick={getToken} className='text-yellow-300 text-2xl bg-BJbrown/60 px-4 py-2 rounded-lg ' >comprar moedas</button>
  //       </div>
  //     </div>

  //     {/* modal buy chips */}
  //     <div className={` InfoModal ${buyChips === true ? 'flex' : 'hidden'} absolute top-0 left-0  flex flex-col justify-center items-center z-10  w-screen h-screen backdrop-blur-sm bg-black/90`} >
  //       <div className=' Container w-[50vh] h-[50vh] bg-BJgreen01/60 relative flex flex-col justify-center items-center gap-y-8 ' >
  //         <button
  //           className=' ButtonClose absolute top-0 right-0 bg-red-500 w-[10%] h-[10%]'
  //           onClick={() => {
  //             buyChips === false ? setBuyChips(true) : setBuyChips(false)
  //           }}
  //         >
  //           X
  //         </button>

  //         <div className=' ContentText bg-BJbrown text-white text-3xl w-[80%] px-4 py-2 gap-y-4 rounded-lg ' >
  //           <p className='text-4xl text-yellow-300' >Compre fichas</p>
  //           <p>balance: {balance}</p>
  //           <p>name: {name}</p>
  //         </div>

  //         <button onClick={getToken} className='text-yellow-300 text-2xl bg-BJbrown/60 px-4 py-2 rounded-lg ' >comprar moedas</button>
  //       </div>
  //     </div>

  //     <main className=' w-full h-[95%] md:h-[90%] flex flex-col justify-center items-center' >
  //       <div
  //         style={{ backgroundImage: `url(/assets/image-dragon.png)`, backgroundRepeat: "no-repeat", backgroundSize: 'cover' }}
  //         className={` w-[50vh] h-[50vh] max-w-[90%] flex flex-col justify-center items-center gap-y-8`} >



  //         <div className=' ContainerContent backdrop-blur-[2px] bg-black/20 w-[50vh] h-[50vh] max-w-[90%] flex flex-col justify-center items-center gap-y-8' >
  //           <h1 className=' text-BJwhite font-bold text-4xl' >Dragon Jack</h1>
  //           <button
  //             className=' PlayButton bg-NTgreenDark text-BJwhite font-bold text-3xl rounded-lg px-4 py-2' onClick={() => { balance > 0 ? navigation('/table') : console.log('compre fichas primeiro'), setBuyChips(true) }}
  //           >
  //             JOGAR
  //           </button>
  //         </div>

  //       </div>
  //     </main>
  //   </section >
  // )
}
export { Home };