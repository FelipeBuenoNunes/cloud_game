const exArr = [
  ["A", "H"],
  ["A", "S"],
  ["A", "C"],
  ["A", "D"],
]

const ContainerDealer = ({ className, arrCards }) => {
  return (
    <section className={`bg-transparent max-w-[90%] mx-auto gap-x-2 flex  overflow-auto  ${className}`}>

      {arrCards && loadImageCards(arrCards)}

    </section>
  );
};

const loadImageCards = (arr) => {
  return arr.map((elem, index) => {
    const number = elem[0];
    const suit = elem[1];

    const nameCard = number + '-' + suit + '.png';
    const pathImage = `./assets/cards/${suit}/${nameCard}`;

    return (
      <div className="min-w-[33px] max-w-[40px] md:max-w-[66px]">
        <img key={index} src={`${pathImage}`} className='md:max-h-24 object-contain' ></img >
      </div>
    );
  });
};

export { ContainerDealer };