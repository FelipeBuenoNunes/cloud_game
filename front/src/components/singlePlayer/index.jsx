import ContainerCards from "./elements/ContainerCard";
import ImagePlayer from "./elements/ImagePlayer";
import Chips from "./elements/chips";
import SumCards from "./elements/sumCards";
const exArr = [
  ["A","C"],
  ["A","E"],
]
const SinglePlayer = () => {
  return(
    <section className="w-[30%]  border-4 border-black flex flex-col justify-center items-center" >
      <ContainerCards arrCards={exArr} />
      <ImagePlayer />
      <Chips value="12.000"/>
      <SumCards sumOfCards={21} />
    </section>
  );
};

export default SinglePlayer;