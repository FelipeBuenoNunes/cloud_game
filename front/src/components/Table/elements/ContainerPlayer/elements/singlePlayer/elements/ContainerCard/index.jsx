// import 'animate.css';
// import Zoom from 'react-reveal/Zoom';
import Fade from 'react-reveal/Fade';

// transition ease-in-out delay-1500

const ContainerCards = ({ arrCards, className }) => {
  return (
    <section
      className={` max-h-[100px] flex flex-row flex-wrap justify-center items-center border-2 border-red-500 overflow-hidden ${className}`} >
      {arrCards && loadImageCards(arrCards)}
    </section>
  );
};

export default ContainerCards;

const loadImageCards = (arr) => {
  return arr.map((elem, index) => {
    const number = elem[0];
    const suit = elem[1];

    const nameCard = number + '-' + suit + '.png';
    const pathImage = `./assets/cards/${suit}/${nameCard}`;

    return (
      <Fade right key={index}>
        <div key={index} className="min-w-[33px] w-[33px] h-[53px]">
          <img key={index} src={`${pathImage}`} className='object-contain' ></img >
        </div>
      </Fade>
    );
  });
};
