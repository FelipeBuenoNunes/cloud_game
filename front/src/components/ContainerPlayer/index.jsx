import SinglePlayer from "../singlePlayer";
import img from '../../assets/bg-game-desktop.png'

const ContainerPlayer = (props) => {
  return (
    <section style={{  backgroundImage:`../../assets/bg-game-mobile.png` }} className={` w-full p-4 flex flex-col justify-end items-stretch ${props.className}`}>
      <div>
        <div className="flex flex-row justify-between items-center">
          <SinglePlayer />
          <SinglePlayer />
        </div>
        <div className="flex flex-row justify-between items-center md:mx-[15%] mt-4">
          <SinglePlayer />
          <SinglePlayer />
        </div>
      </div>

      <div className="flex flex-row justify-center items-center">
        <SinglePlayer />
      </div>
    </section>
  );
};

export default ContainerPlayer;
