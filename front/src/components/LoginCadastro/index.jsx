import { useEffect } from 'react';
import { useState } from 'react';

const LoginCadastro = () => {
  const [sign, setSign] = useState("login");

  // useEffect(() => {
  //   sign === 'login' ? 'cadastro' : 'login';
  // }, sign);

  const Login = (
    <section className=" bg-gradient-to-r from-green-100 to-white   w-screen h-screen flex flex-col justify-center items-center" >
      <div className="bg-gradient-to-r from-green-300 via-green-500 to-green-700 w-[50vh] h-[50vh] max-w-[90vw] gap-y-8 flex flex-col justify-center items-center rounded-lg" >

        <h3 className="text-[#333] font-semibold text-3xl" >Login</h3>
        <div className="max-w-[80%] flex flex-col gap-y-2">
          <input type="text" placeholder="Email" className="rounded-sm text-2xl" />
          <input type="text" placeholder="Senha" className="rounded-sm text-2xl " />
        </div>

        <button className="bg-black h-8 text-white rounded-md w-[50%] text-xl" >Entrar</button>

        <hr className="w-[60%] border border-black" />
        <button onClick={() => { setSign('cadastro') }} >
          <p className="text-[#eee]" >Cadastrar</p>
        </button>

      </div>
    </section>
  );

  const Cadastro = (
    <section className=" bg-gradient-to-r from-green-100 to-white   w-screen h-screen flex flex-col justify-center items-center" >
      <div className="bg-gradient-to-r from-green-300 via-green-500 to-green-700 w-[50vh] h-[50vh] max-w-[90vw] gap-y-8 flex flex-col justify-center items-center rounded-lg" >

        <h3 className="text-[#333] font-semibold text-3xl" >Cadastro</h3>
        <div className="max-w-[80%] flex flex-col gap-y-2">
          <input type="text" placeholder="Email" className="rounded-sm text-2xl" />
          <input type="text" placeholder="Senha" className="rounded-sm text-2xl " />
        </div>

        <button className="bg-black h-8 text-white rounded-md w-[50%] text-xl" >Entrar</button>

        <hr className="w-[60%] border border-black" />
        <button onClick={() => { setSign('login') }} >
          <p className="text-[#eee]" >Já tenho conta</p>
        </button>

      </div>
    </section>
  )

  return (
    sign === "login" ? Login : Cadastro
  )
}

export { LoginCadastro };