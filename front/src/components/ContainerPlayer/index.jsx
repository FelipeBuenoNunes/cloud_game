import SinglePlayer from "./elements/SinglePlayer";

const Player = (props) => {
  return(
    <div className="bg-BJblack flex flex-row justify-center items-start" >

      <SinglePlayer />
      <SinglePlayer />
      <SinglePlayer />
      <SinglePlayer />
      <SinglePlayer />

    </div>
  );
}