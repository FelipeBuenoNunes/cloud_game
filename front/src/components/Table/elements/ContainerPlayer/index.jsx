import SinglePlayer from "./elements/singlePlayer";
// import img from '../../assets/bg-game-desktop.png'

const ContainerPlayer = ({ main, p1, p2, p3, p4, className }) => {
  return (
    <section className={` w-full p-1 flex flex-col justify-end items-stretch ${className}`}>
      <div>
        <div className="flex flex-row justify-between items-center gap-x-2">
          {p1 && <SinglePlayer mainPlayer={false} positionLeft={true} player={p1} />}
          {p2 && <SinglePlayer mainPlayer={false} player={p2} />}
        </div>
        <div className="flex flex-row justify-between items-center my-8 gap-x-2">
          {p3 && <SinglePlayer mainPlayer={false} positionLeft={true} className={`md:ml-[10%]`} player={p3} />}
          {p4 && <SinglePlayer mainPlayer={false} className={`md:mr-[10%]`} player={p4} />}
        </div>
      </div>

      <div className="flex flex-row justify-center items-center">
        {main && <SinglePlayer mainPlayer={true} player={main} />}
      </div>
    </section>
  );
};

export { ContainerPlayer };
