import SinglePlayer from "../singlePlayer";
// import img from '../../assets/bg-game-desktop.png'

const ContainerPlayer = ({ p1, p2, p3, p4, p5, className }) => {
  return (
    <section className={` w-full p-1 flex flex-col justify-end items-stretch ${className}`}>
      <div>
        <div className="flex flex-row justify-between items-center gap-x-2">
          <SinglePlayer positionLeft={true} />
          <SinglePlayer />
        </div>
        <div className="flex flex-row justify-between items-center my-4 gap-x-2">
          <SinglePlayer positionLeft={true} className={`md:ml-[5%]`} />
          <SinglePlayer className={`md:mr-[5%]`} />
        </div>
      </div>

      <div className="flex flex-row justify-center items-center">
        <SinglePlayer mainPlayer={true} />
      </div>
    </section>
  );
};

export default ContainerPlayer;
