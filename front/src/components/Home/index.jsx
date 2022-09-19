import { useNavigate, useParams } from 'react-router-dom';
import { Header } from '../Header';

const Home = () => {
  const navigation = useNavigate();
  const { userName, id } = useParams();

  return (
    <section className='bg-gradient-to-r from-green-100 to-white w-screen h-screen' >
      <Header className={`h-[5%] md:h-[10%]`} />

      <main className=' w-full h-[95%] md:h-[90%] flex flex-col justify-center items-center' >
        <div className='bg-gradient-to-r from-green-300 via-green-500 to-green-700 w-[50vh] h-[50vh] max-w-[90%] flex flex-col justify-center items-center' >
          <button className='bg-BJblue01 text-white font-bold text-4xl rounded-lg px-4' onClick={() => { navigation('/table') }} >JOGAR</button>
        </div>
      </main>
    </section>
  )
}

export { Home };