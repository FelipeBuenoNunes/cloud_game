import { useNavigate, useParams } from 'react-router-dom';

const Home = () => {
  const navigation = useNavigate();
  const { userName, id } = useParams();

  return (
    <section className='w-screen h-screen' >
      <header className=' bg-red-400  flex flex-row justify-evenly' >
        <div className='flex flex-row justify-around' >
          <button>exit |</button>
          <button>som |</button>
          <button>ajuda</button>
        </div>
        <p>Black Jack</p>
        <p>12.000</p>
        <p>{userName}</p>
      </header>

      <main className='w-full h-full flex flex-col justify-center items-center' >
        <div className='bg-blue-300 w-[50vh] h-[50vh] max-w-[90%] flex flex-col justify-center items-center' >
          <button className='bg-blue-900 text-white font-bold text-4xl rounded-lg px-4' onClick={() => { navigation('/table') }} >JOGAR</button>
        </div>
      </main>
    </section>
  )
}

export { Home };