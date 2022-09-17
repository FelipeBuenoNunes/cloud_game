import { useState } from 'react';
import { ethers } from 'ethers';

const LoginCadastro = () => {
  const [error, setError] = useState('');
  const [wallet, setWallet] = useState('');
  const [sign, setSign] = useState('login');
  const [name, setName] = useState('');

  const handleChange = event => {
    setName(event.target.value);

    console.log('value is:', event.target.value);
  };

  const erroDiv = <div>{error}</div>

  const login = (
    <section className=" bg-gradient-to-r from-green-100 to-white   w-screen h-screen flex flex-col justify-center items-center" >
      <div className="bg-gradient-to-r from-green-300 via-green-500 to-green-700 w-[50vh] h-[50vh] max-w-[90vw] gap-y-8 flex flex-col justify-center items-center rounded-lg" >

        <h3 className="text-[#333] font-semibold text-3xl" >Login</h3>


        <button onClick={() => { doSignIn() }} className="bg-black h-8 text-white rounded-md w-[50%] text-xl" >Entrar</button>

        <hr className="w-[40%] border border-black" />
        <button onClick={() => { setSign('cadastro') }} >
          <p className="text-[#eee]" >Cadastrar</p>
        </button>

        {/* <button onClick={() => { doSignUp() }} className="bg-black h-8 text-white rounded-md w-[50%] text-xl" >Cadastrar</button> */}


        {error && erroDiv}

      </div>
    </section>
  );

  const cadastro = (
    <section className=" bg-gradient-to-r from-green-100 to-white   w-screen h-screen flex flex-col justify-center items-center" >
      <div className="bg-gradient-to-r from-green-300 via-green-500 to-green-700 w-[50vh] h-[50vh] max-w-[90vw] gap-y-8 flex flex-col justify-center items-center rounded-lg" >

        <h3 className="text-[#333] font-semibold text-3xl" >Cadastrar</h3>

        <input value={name} onChange={handleChange} type="text" placeholder="Name" className="rounded-sm text-2xl w-[50%] rounded-lg" />

        <button onClick={() => { doSignUp() }} className="bg-black h-8 text-white rounded-md w-[50%] text-xl" >Cadastrar</button>

        <hr className="w-[40%] border border-black" />
        <button onClick={() => { setSign('login') }} >
          <p className="text-[#eee]" >Login</p>
        </button>

        {/* <button onClick={() => { doSignUp() }} className="bg-black h-8 text-white rounded-md w-[50%] text-xl" >Cadastrar</button> */}


        {error && erroDiv}

      </div>
    </section>
  );

  return (
    sign === "login" ? login : cadastro
  );




  function doSignIn() {
    connect('login')
      .then(credentials => {
        console.log(credentials);
        fetch('http://localhost:8080/login', {
          method: 'POST',
          credentials: 'include',
          body: JSON.stringify(credentials),
          headers: new Headers({
            'Content-Type': 'application/json'
          })
        })
          .then(res => res.json())
          .then(result => {
            console.log(result);
            // localStorage.setItem('token', result.token);
          });
      })
      .catch(err => setError(err.message));
  }


  function doSignUp() {
    connect('cadastro')
      .then(credentials => {
        fetch('http://localhost:8080/new-user', {
          method: 'POST',
          credentials: 'include',
          body: JSON.stringify(credentials),
          headers: new Headers({
            'Content-Type': 'application/json'
          })
        })
          .then(res => res.json())
          .then(result => {
            console.log(result);
            // localStorage.setItem('token', result.token);
          })
          .catch(err => setError(err.message));
      });
  }

  async function connect(value) {
    let response;
    try {
      response = await fetch('http://localhost:8080/get-message', {
        credentials: 'include',
      });
    } catch (err) {
      setError(err.message);
    }

    const message = await response.json();
    const SECRET = message.data;
    // TODO adicionar campo de nome de usuário no front . Estamos com o userName da resposta hardcoded

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

    return { personalWallet: accounts[0], password, userName: name }
  }

}


export { LoginCadastro };