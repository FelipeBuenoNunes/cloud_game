import SinglePlayer from "./elements/singlePlayer";
// import img from '../../assets/bg-game-desktop.png'

const ContainerPlayer = ({ p1, p2, p3, p4, p5, className }) => {
  return (
    <section className={` w-full p-1 flex flex-col justify-end items-stretch ${className}`}>
      <div>
        <div className="flex flex-row justify-between items-center gap-x-2">
          <SinglePlayer positionLeft={true} name="felipe" />
          <SinglePlayer name="bueno" />
        </div>
        <div className="flex flex-row justify-between items-center my-8 gap-x-2">
          <SinglePlayer positionLeft={true} className={`md:ml-[10%]`} name="gabriel" />
          <SinglePlayer className={`md:mr-[10%]`} name="jony" />
        </div>
      </div>

      <div className="flex flex-row justify-center items-center">
        <SinglePlayer mainPlayer={true} name="kenji" />
      </div>
    </section>
  );
};

export { ContainerPlayer };
