import BetChips from "./elements/BetChips";
import ContainerCards from "./elements/ContainerCard";
import ImagePlayer from "./elements/ImagePlayer";
import Chips from "./elements/Chips";
import SumCards from "./elements/SumCards";
// import img from "../../assets/cards/"


const exArr = [
  ["K", "H"],
  ["J", "S"],
  ["J", "S"],
  ["J", "S"],
  ["J", "S"],
  ["J", "S"],
  ["J", "S"],
  ["J", "S"],
  ["J", "D"],
  ["J", "D"],
  ["J", "D"],
]

const SinglePlayer = ({ arrayCards, className, positionLeft, mainPlayer }) => {
  const containerCards = positionLeft ? 'order-2' : '';
  const containerImage = positionLeft ? 'order-1' : '';
  const MainPlayer = mainPlayer ? 'flex flex-col' : '';
  const overflowX = mainPlayer ? 'flex-nowrap max-w-[300px]' : '';

  return (
    <section className={` flex flex-row justify-center items-center ${className} ${MainPlayer}`} >
      <div className={`${containerCards}`} >
        <ContainerCards arrCards={exArr} className={`${overflowX}`} />
        <SumCards sumOfCards={13} />
      </div>

      <div className={`flex flex-col items-center gap-x-1 ${containerImage} `} >
        <BetChips valueBet={100} />
        <ImagePlayer />
        <Chips value="12.000" />
      </div>
    </section>
  );
};

export default SinglePlayer;

// [V] function para carregar images

// [ ] function para somar as cartas