// import SinglePlayer from "./elements/SinglePlayer";
import SinglePlayer from "../singlePlayer";

const ContainerPlayer = (props) => {
  return (
    <div className={`bg-blue-500 w-full p-4 flex flex-col justify-end items-stretch ${props.className}`}>
      <div>
        <div className="flex flex-row justify-between items-center">
          <SinglePlayer />
          <SinglePlayer />
        </div>
        <div className="flex flex-row justify-between items-center">
          <SinglePlayer />
          <SinglePlayer />
        </div>
      </div>

      <div className="flex flex-row justify-center items-center">
        <SinglePlayer />
      </div>
    </div>
  );
};

export default ContainerPlayer;
