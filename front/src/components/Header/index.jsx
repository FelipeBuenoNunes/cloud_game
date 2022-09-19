import { useNavigate } from "react-router-dom";

const exit = `${process.env.PUBLIC_URL}/assets/icons/exit.png`;
const sound = `${process.env.PUBLIC_URL}/assets/icons/sound.png`;
const help = `${process.env.PUBLIC_URL}/assets/icons/help.png`;

const Header = ({ className }) => {
  const navigation = useNavigate();
  return (
    <section className={`bg-BJgreen04 mb-1 px-4 py-2 gap-x-1 flex flex-row justify-start items-center  ${className}`} >
      <button onClick={() => { navigation('/') }} >
        <img className="w-6 md:w-8" src={exit} alt="" />
      </button>
      <button onClick={() => { console.log('button sound') }} >
        <img className="w-6 md:w-8" src={sound} alt="" />
      </button>
      <button onClick={() => { console.log('button help') }} >
        <img className="w-6 md:w-8" src={help} alt="" />
      </button>

      <div className=" ml-4 flex gap-x-4" >
        <button className="bg-BJblue01 h-6 w-12 rounded-md text-center " onClick={() => { navigation('/login') }} >login</button>
        <button className="bg-BJblue01 h-6 w-12 rounded-md text-center " onClick={() => { navigation('/') }} >home</button>
        <button className="bg-BJblue01 h-6 w-12 rounded-md text-center " onClick={() => { navigation('/table') }} >table</button>
      </div>
    </section>
  );
};
export { Header };