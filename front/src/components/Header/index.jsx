import { useNavigate } from "react-router-dom";
// import { toggleAudio } from "../Table/index";

const exit = `${process.env.PUBLIC_URL}/assets/icons/exit.png`;
const sound = `${process.env.PUBLIC_URL}/assets/icons/sound.png`;
const help = `${process.env.PUBLIC_URL}/assets/icons/help.png`;

const Header = ({ className }) => {
  const navigation = useNavigate();

  // const audio = toggleAudio();
  // bg-gradient-to-r from-[#9a031e] to-BJblack
  return (
    <section className={` mb-1 px-4 py-2 gap-x-1 flex flex-row justify-start items-center  ${className}`} >
      {/* <button onClick={() => { navigation(-1) }} >
        <img className="w-6 md:w-8" src={exit} alt="" />
      </button> */}
      <button className=' py-1 flex items-center text-white font-bold text-3xl' onClick={() => navigation(-1)}>
        <img className="mr-3" src="/assets/arrow.svg" alt="arrow" />
        Sair
      </button>

      {/* <button onClick={() => { console.log('som') }} >
        <img className="w-6 md:w-8" src={sound} alt="" />
      </button> */}

      {/* <button onClick={() => { console.log('button help') }} >
        <img className="w-6 md:w-8" src={help} alt="" />
      </button> */}

      {/* <div className=" ml-4 flex gap-x-4" >
        <button className="bg-BJblue01 h-6 w-12 rounded-md text-center " onClick={() => { navigation('/login') }} >login</button>
        <button className="bg-BJblue01 h-6 w-12 rounded-md text-center " onClick={() => { navigation('/') }} >home</button>
        <button className="bg-BJblue01 h-6 w-12 rounded-md text-center " onClick={() => { navigation('/table') }} >table</button>
      </div> */}
    </section>
  );
};
export { Header };