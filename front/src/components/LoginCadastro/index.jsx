import { useState } from 'react';
import { ethers } from 'ethers';
import { useNavigate } from 'react-router-dom';

// APENAS PARA TESTEES
import { Header } from '../Header';
import { parse } from '@ethersproject/transactions';
import { useUser } from '../../providers/user';
import { get } from '../../functions/req';

// não funciona o navigation('/');

const LoginCadastro = () => {
  const url = "https://metamask.io/download/";
  const [error, setError] = useState('');
  let name = "";
  const setBueno = useUser().setBueno;

  const isMetaMaskInstalled = () => {
    const { ethereum } = window;
    const isInstalled = Boolean(ethereum && ethereum.isMetaMask);
    if (!isInstalled) {
      console.log(
        "Please install the MetaMask extension! Then you can procede to use the app."
      );
      window.alert('Por favor instale a MetaMask para fazer login!')
    }
    return isInstalled;
  };


  const setContext = async () => {
    const res = await get("/infos");
    setBueno(res.name);
  }

  const navigation = useNavigate();

  const erroDiv = <div>{error}</div>

  const Left = () => {
    let [isCadaster, setIsCadaster] = useState(false)
    return (
      <div className='w-[45%] h-[100vh] bg-white flex justify-center items-center rounded-r-[2rem]'>
        <div className='border-2 w-[32rem] h-[24rem] border-[#1A1A32] rounded-3xl flex flex-col justify-center items-center'>
          {
            isCadaster ?
              <input className='border-2 border-[#212121] w-[21rem] h-[4rem] text-[#212120] text-2xl font-bold rounded-[1.2rem] pl-4' type="text" placeholder='username' id="name-input" onChange={(e) => name = e.target.value} /> :
              <button className='bg-[#1A1A32] w-[21rem] h-[4rem] text-white text-3xl font-bold rounded-[1.2rem]' onClick={() => { doSignIn() }}>Logar</button>
          }
          <button className='mb-3 bg-[#1A1A32] w-[21rem] h-[4rem] text-white text-3xl font-bold rounded-[1.2rem] mt-9' onClick={() => {
            if (!isCadaster) return setIsCadaster(true);
            doSignUp();
          }}>Registre-se</button>
          <button className={`${!isCadaster && 'hidden'}`} onClick={() => setIsCadaster(false)}>Já possue uma conta? clique aqui</button>
        </div>
        <img className="absolute bottom-3" src="/assets/logo.svg" alt="logo" />
      </div>
    )
  }

  const Rigth = () => {
    return (
      <div className='w-[55%] h-[100vh] bg-[#910023] flex justify-center items-center'>
        <div>
          <img src="/assets/dragon.png" alt="dragon" />
        </div>
      </div>
    )
  }

  return (
    //sign === "login" ? login : cadastro
    <div className='flex bg-[#910023]'>
      <Left />
      <Rigth />
    </div>
  );

  function doSignIn() {
    // const navigation = useNavigate();
    connect('login')
      .then(credentials => {
        console.log(credentials);
        fetch(process.env.REACT_APP_URL + '/login', {
          method: 'POST',
          credentials: 'include',
          body: JSON.stringify(credentials),
          headers: new Headers({
            'Content-Type': 'application/json'
          })
        })
          .then(async res => {
            if (res.status === 200) {
              await setContext()
              navigation('/home');
            }
            else console.log("erro no login");
          })
      })
      .catch(err => setError(err.message));
  }


  function doSignUp() {
    connect('cadastro')
      .then(credentials => {
        fetch(process.env.REACT_APP_URL + '/new-user', {
          method: 'POST',
          credentials: 'include',
          body: JSON.stringify(credentials),
          headers: new Headers({
            'Content-Type': 'application/json'
          })
        })
          .then(async res => {
            if (res.status === 200) {
              await setContext()
              navigation('/home');
            }
            else console.log("erro no login");
          })
          .catch(err => setError(err.message));
      }).catch(err => setError(err.message));
  }

  async function connect(value) {
    let response;
    try {
      response = await fetch(process.env.REACT_APP_URL + '/get-message', {
        credentials: 'include',
      });
    } catch (err) {
      console.error(err);
    }

    const message = await response.json();
    const SECRET = message.data;

    setError('');

    if (!isMetaMaskInstalled()) {
      window.open(url, "_blank", "noopener,noreferrer");
      return;
    }

    const provider = new ethers.providers.Web3Provider((window).ethereum);
    const accounts = await provider.send('eth_requestAccounts', []);
    if (!accounts || !accounts.length) return setError('Wallet not found/allowed!');

    const signer = provider.getSigner();
    const password = await signer.signMessage(SECRET);

    if (value === 'login') return { personalWallet: accounts[0], password };
    console.log("name? ", name)
    if (name.length < 4) return;
    return { personalWallet: accounts[0], password, userName: name };
  }

}


export { LoginCadastro };