import ContainerCards from "./elements/ContainerCard";
const exArr = [
  ["A","C"],
  ["A","E"],
  ["A","P"],
  ["A","O"],
]
const SinglePlayer = () => {
  return(
    <section className="bg-green-500 border-3 border-black flex flex-col" >
      <ContainerCards arrCards={exArr} />
      {/* imgPlayer
      chips
      sumCards */}
    </section>
  );
};

export default SinglePlayer;