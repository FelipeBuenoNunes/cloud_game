import { useNavigate, useParams } from 'react-router-dom';
import { Header } from '../Header';
// import imageDragon from '/assets/image-dragon.png'
// style={{ backgroundImage: `url(/assets/image-dragon.png)` }} 


const Home = () => {
  const navigation = useNavigate();
  const { userName, id } = useParams();

  return (
    <section className='bg-[#ffdab9] w-screen h-screen' >
      <Header className={`h-[5%] md:h-[10%]`} />

      <main className=' w-full h-[95%] md:h-[90%] flex flex-col justify-center items-center' >
        <div
          style={{ backgroundImage: `url(/assets/image-dragon.png)`, backgroundRepeat: "no-repeat", backgroundSize: 'cover' }}
          className={` w-[50vh] h-[50vh] max-w-[90%] flex flex-col justify-center items-center gap-y-8`} >

          <div className='backdrop-blur-[2px] bg-black/20 w-[50vh] h-[50vh] max-w-[90%] flex flex-col justify-center items-center gap-y-8' >
            <h1 className=' text-BJwhite font-bold text-4xl' >Dragon Jack</h1>
            <button className='bg-NTgreenDark text-BJwhite font-bold text-3xl rounded-lg px-4 py-2' onClick={() => { navigation('/table') }} >JOGAR</button>
          </div>

        </div>
      </main>
    </section>
  )
}
// bg-gradient-to-r from-green-300 via-green-500 to-green-700
export { Home };