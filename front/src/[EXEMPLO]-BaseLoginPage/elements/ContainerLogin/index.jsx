const Login = () => {
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
  )
}

export default Login;