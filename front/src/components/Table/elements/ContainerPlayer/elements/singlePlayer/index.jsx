import BetChips from "./elements/BetChips";
import ContainerCards from "./elements/ContainerCard";
import ImagePlayer from "./elements/ImagePlayer";
import Chips from "./elements/Chips";
import SumCards from "./elements/SumCards";
// import img from "../../assets/cards/"


const exArr = [
  ["K", "H"],
  ["J", "C"],
  ["J", "S"],
  ["A", "D"],

]

const SinglePlayer = ({ className, positionLeft, mainPlayer, player, balance }) => {
  const containerCards = positionLeft ? 'order-2' : '';
  const containerImage = positionLeft ? 'order-1' : '';
  const MainPlayer = mainPlayer ? 'flex flex-col' : '';
  const overflowX = mainPlayer ? 'flex-nowrap max-w-[300px]' : '';

  const primeiraLetra = player.name[0].toUpperCase();

  return (
    <section className={` flex flex-row justify-center items-center ${className} ${MainPlayer}`} >
      <div className={`${containerCards}`} >
        <ContainerCards arrCards={player.cards} className={`${overflowX}`} />
        <SumCards sumOfCards={player.valueA11 <= 21 ? player.valueA11 : player.valueA1} />
      </div>

      <div className={`flex flex-col items-center gap-x-1 ${containerImage} `} >
        <BetChips valueBet={player.bet} />
        <div className="flex flex-row bg-NTblue px-4 py-2 rounded-full" >
          <p className="text-BJblack font-bold text-2xl" >{primeiraLetra}</p>
          {/* <ImagePlayer /> */}
        </div>
        <Chips value={balance} />
      </div>
    </section>
  );
};

export default SinglePlayer;

// [V] function para carregar images

// [ ] function para somar as cartas