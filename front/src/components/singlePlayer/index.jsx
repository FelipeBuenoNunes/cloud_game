import ContainerCards from "./elements/ContainerCard";
import ImagePlayer from "./elements/ImagePlayer";
import Chips from "./elements/chips";
import SumCards from "./elements/sumCards";
// import img from "../../assets/cards/"


const exArr = [
  ["A", "C"],
  ["A", "C"],
  ["4", "C"],
]

const SinglePlayer = ({ arrayCards }) => {
  return (
    <section className="w-[30%]  border-4 border-black flex flex-col justify-center items-center" >
      <ContainerCards arrCards={exArr} />
      <ImagePlayer />
      <Chips value="12.000" />
      <SumCards sumOfCards={17} />
      {imageCards(exArr)}
    </section>
  );
};

export default SinglePlayer;

// function para carregar images
const imageCards = (arr) => {
  let imageName = '';
  const suits = ['spades', 'hearts', 'clubs', 'diamonds'];

  return (
    arr.map((elem) => {
      const numberCard = elem[0];
      const suitCard = elem[1];
      imageName = numberCard + '-' + suitCard + '.png';
      // console.log(`../../assets/cards/${suitCard}/${imageName} `)
      <img src={`../../assets/cards/${suitCard}/${imageName} `} ></img>
    })
  );

};

// function para somar as cartas