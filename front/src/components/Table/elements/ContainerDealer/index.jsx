const bgBack = `${process.env.PUBLIC_URL}/assets/bg-back-card.png`;

const ContainerDealer = ({ className, arrCards }) => {
  return (
    <section className={`bg-transparent max-w-[90%] mx-auto gap-x-2 flex  overflow-auto  ${className}`}>

      {arrCards && loadImageCards(arrCards)}

    </section>
  );
};

const loadImageCards = (arr) => {
  return arr.map((elem, index, array) => {
    const number = elem[0];
    const suit = elem[1];

    const nameCard = number + '-' + suit + '.png';
    const pathImage = `./assets/cards/${suit}/${nameCard}`;

    return (
      <>
        <div key={index} className="min-w-[33px] max-w-[40px] md:max-w-[66px]">
          <img src={`${pathImage}`} className='md:max-h-24 object-contain' ></img >
        </div>
        {array.length <= 1 &&
          <div className="min-w-[33px] max-w-[40px] md:max-w-[66px]">
            <img src={bgBack} className='md:max-h-24 object-contain' ></img >
          </div>
        }
      </>
    );
  });
};

export { ContainerDealer };