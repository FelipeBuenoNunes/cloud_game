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
  const [error, setError] = useState('');
  const [wallet, setWallet] = useState('');
  const [sign, setSign] = useState('login');
  const [name, setName] = useState('');
  const setBueno = useUser().setBueno;


  const setContext = async () => {
    const res = await get("/infos");
    setBueno(res.name);
  }

  const navigation = useNavigate();

  const handleChange = event => setName(event.target.value);

  const erroDiv = <div>{error}</div>

  // const login = (
  //   <section className=" bg-BJgreen01 w-screen h-screen flex flex-col justify-center items-center" >

  //     <div
  //       style={{ backgroundImage: `url(/assets/image-dragon.png)`, backgroundRepeat: "no-repeat", backgroundSize: 'cover' }}
  //       className=" text-white w-[50vh] h-[50vh] max-w-[90vw] gap-y-8 flex flex-col justify-center items-center rounded-lg" >

  //       <div className='backdrop-blur-[2px] bg-black/80 w-full h-full flex flex-col justify-center items-center gap-y-8' >

  //         <h3 className="text-white font-semibold text-4xl" >Login</h3>
  //         <button onClick={() => { doSignIn() }} className="bg-NTgreenDark h-8 text-white rounded-md w-[50%] text-xl" >Entrar</button>

  //         <hr className="w-[40%] border border-green-400" />

  //         <button onClick={() => { setSign('cadastro') }} >
  //           <p className="text-[#eee]" >Cadastrar</p>
  //         </button>
  //       </div>

  //       {error && erroDiv}

  //     </div>
  //   </section>
  // );

  const Left = () => {
    let [isCadaster, setIsCadaster] = useState(false)
    return (
      <div className='w-[45%] h-[100vh] bg-white flex justify-center items-center'>
        <div className='border-2 w-[32rem] h-[24rem] border-[#1A1A32] rounded-3xl flex flex-col justify-center items-center'>
          {
            isCadaster ?
              <input className='border-2 border-[#212121] w-[21rem] h-[4rem] text-[#212120] text-2xl font-bold rounded-[1.2rem] pl-4' type="text" placeholder='username' id="name-input" /> :
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
  // const cadastro = (
  //   <section className=" bg-BJgreen01  w-screen h-screen flex flex-col justify-center items-center" >
  //     <div
  //       style={{ backgroundImage: `url(/assets/image-dragon.png)`, backgroundRepeat: "no-repeat", backgroundSize: 'cover' }}
  //       className="w-[50vh] h-[50vh] max-w-[90vw] gap-y-8 flex flex-col justify-center items-center rounded-lg"
  //     >

  //       <div className='backdrop-blur-[2px] bg-black/80 flex flex-col justify-center items-center gap-y-8 w-full h-full' >

  //         <h3 className="text-white font-semibold text-3xl" >Cadastrar</h3>
  //         <input value={name} onChange={handleChange} type="text" placeholder="Name" className="rounded-sm text-2xl w-[50%]" />
  //         <button onClick={() => { doSignUp() }} className="bg-NTgreenDark h-8 text-white rounded-md w-[50%] text-xl" >Cadastrar</button>

  //         <hr className="w-[40%] border border-green-400" />

  //         <button onClick={() => { setSign('login') }} >
  //           <p className="text-[#eee]" >Login</p>
  //         </button>

  //         {error && erroDiv}
  //       </div>

  //     </div>
  //   </section>
  // );

  return (
    //sign === "login" ? login : cadastro
    <div className='flex'>
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

    if (!window.ethereum) return setError('No MetaMask found!');

    const provider = new ethers.providers.Web3Provider((window).ethereum);
    const accounts = await provider.send('eth_requestAccounts', []);
    if (!accounts || !accounts.length) return setError('Wallet not found/allowed!');

    localStorage.setItem('wallet', accounts[0]);

    setWallet(accounts[0]);

    const signer = provider.getSigner();
    const password = await signer.signMessage(SECRET);

    if (value === 'login') {
      return { personalWallet: accounts[0], password }
    }
    const name = document.getElementById('name-input').value
    return { personalWallet: accounts[0], password, userName: name }
  }

}


export { LoginCadastro };