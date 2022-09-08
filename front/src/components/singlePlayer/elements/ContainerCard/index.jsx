// estilizar para cartas ficarem uma em cima da outra, alinhadas a esquerda

const exArr = [
  ["A-","C"],
  ["A-","E"],
  ["A-","P"],
  ["A-","O"],
]

const ContainerCards = ({arrCards}) => {
  return(
    <section className="flex flex-row  border-2 border-red-500 " >
      {arrCards.map((elem,index,arr) => (
          <div key={index} className="bg-pink-300 flex flex-row justify-center items-center text-black w-[40px] " >
            |{elem[0]+elem[1]}|
          </div>
      ))}
    </section>
  );
};

export default ContainerCards;
{/* {String(elem[0])}
{String(elem[1])} */}