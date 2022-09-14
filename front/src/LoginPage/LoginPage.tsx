/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect, SetStateAction } from 'react';
// import { ethers } from 'ethers';
// import { doSignInBackend, doSignOutBackend, doSignUpBackend, getProfileBackend } from './AppService.js';
// import { useNavigate } from 'react-router-dom';
// import {useState, useEffect} from 'react';

export default function LoginPage() {

  // const navigate = useNavigate(); // depois use algo como navigate(/home);

  const [wallet, setWallet] = useState('');
  const [profile, setProfile] = useState({});
  const [balance, setBalance] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const address = localStorage.getItem('wallet');
    setWallet(address ?? '');

    if (address) doSignIn();
  }, []);

  async function connect(): Promise<void | { personalWallet: string; password: string; userName: string; }> {
    const response = await fetch('http://localhost:8081/get-message',{
      credentials: 'include',
    });
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

  async function loadProfile(token: string) {
    const profile = await getProfileBackend(token);
    setProfile(profile);
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

  function getBalance() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    provider.getBalance(wallet)
      .then(balance => setBalance(ethers.utils.formatEther(balance.toString())))
      .catch(err => setError(err.message));
  }

  function doLogout() {
    setError('');

    const token = localStorage.getItem('token');
    doSignOutBackend(token)
      .then(() => {
        localStorage.removeItem('wallet');
        localStorage.removeItem('token');
        setWallet('');
        setBalance('');
      })
      .catch((err: { message: SetStateAction<string>; }) => setError(err.message));
  }

  return (
    <div className='App py-4 pt-10 w-screen h-screen bg-body-light-200 dark:bg-[#0f6553] flex flex-col items-center gap-2' >
      <header className="App-header">
        <h1 className='text-paragraph-dark dark:text-paragraph-light-100 text-xl font-medium mb-6'>Login</h1>
        <div>
          {
            !wallet
              ? (
                <>
                  <button onClick={doSignIn} className={
                    'text-btn-text p-2 h-[40px] w-[250px] border-0 rounded-md bg-[#523c28]'
                  }>
                    Sign In with MetaMask
                  </button>
                  <button onClick={doSignUp} className={
                    'text-btn-text p-2 h-[40px] w-[250px] border-0 rounded-md bg-[#523c28] flex justify-center'
                  }>
                    Sign Up with MetaMask
                  </button>
                </>
              )
              : (
                <>
                  <p>
                    Wallet: {wallet}
                  </p>
                  <p>
                    Name: {profile.name}
                  </p>
                  <p>
                    <button onClick={getBalance} className={
                      'text-btn-text p-2 h-[40px] w-[250px] border-0 rounded-md bg-[#523c28] flex justify-center'
                    }>
                      See Balance
                    </button> {balance}
                  </p>
                  <button onClick={doLogout} className={
                    'text-btn-text p-2 h-[40px] w-[250px] border-0 rounded-md bg-[#523c28] flex justify-center'
                  }>
                    Logout
                  </button>
                </>
              )
          }
          {
            error ? <p className='text-input-error w-[250px] ml-[16px] text-[16px]'>{error}</p> : <></>
          }
        </div>
      </header>
    </div>
  );
}
