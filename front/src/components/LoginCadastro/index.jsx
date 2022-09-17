import { useState } from 'react';

const LoginCadastro = () => {
  const [error, setError] = useState('');

  const erroDiv = <div>{error}</div>

  return (
    <section className=" bg-gradient-to-r from-green-100 to-white   w-screen h-screen flex flex-col justify-center items-center" >
      <div className="bg-gradient-to-r from-green-300 via-green-500 to-green-700 w-[50vh] h-[50vh] max-w-[90vw] gap-y-8 flex flex-col justify-center items-center rounded-lg" >

        <h3 className="text-[#333] font-semibold text-3xl" >Login</h3>

        <div className='w-[90%] flex flex-col justify-center items-center gap-y-2 ' >
          <button onClick={() => { doSignIn() }} className="bg-black h-8 text-white rounded-md w-[50%] text-xl" >Entrar</button>
          <button onClick={() => { doSignUp() }} className="bg-black h-8 text-white rounded-md w-[50%] text-xl" >Cadastrar</button>
        </div>

        {error && erroDiv}

      </div>
    </section>
  );


  function doSignIn() {
    connect()
      .then(credentials => {
        console.log(credentials);
        fetch('http://localhost:8081/login', {
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
    connect()
      .then(credentials => {
        fetch('http://localhost:8081/new-user', {
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

  async function connect() {
    try {
      const response = await fetch('http://localhost:8081/get-message', {
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

    return { personalWallet: accounts[0], password, userName: 'hugo' };
  }

}


export { LoginCadastro };