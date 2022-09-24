const exArr = [
  ["A", "H"],
  ["A", "S"],
  ["A", "C"],
  ["A", "D"],
]
const ContainerCards = ({ arrCards, className }) => {
  return (
    <section className={`max-h-[100px] flex flex-row flex-wrap justify-center items-center overflow-auto border-2 border-red-500 ${className}`} >
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
      <div key={index} className="min-w-[33px] w-[33px] h-[53px]">
        <img key={index} src={`${pathImage}`} className='object-contain' ></img >
      </div>
    );
  });
};
