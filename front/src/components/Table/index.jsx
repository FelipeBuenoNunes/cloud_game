import { Header } from '../Header';
import { ContainerDealer, ContainerPlayer, ContainerButtons } from './elements';

const exArr = [
  ["A", "H"],
  ["A", "H"],
  ["A", "S"],
  ["A", "C"],
  ["A", "D"],
  ["A", "H"],
  ["A", "S"],
  ["A", "C"],
  ["A", "D"],
  ["A", "H"],
  ["A", "S"],
]
// front/src/assets/table-02.png

const Table = ({ children }) => {
  return (
    <>
      <section className="bg-boardMobile bg-no-repeat bg-cover object-contain bg-center w-screen h-screen flex flex-col md:bg-boardDesktop">
        <Header className={`h-[5%] md:h-[10%]`} arr />
        <ContainerDealer className={`h-[10%] md:h-[15%] md:mb-16`} arrCards={exArr} />
        <ContainerPlayer className={``} />
        <ContainerButtons className={`h-[5%] md:h-[10%]`} />
      </section>
    </>
  );
};

export default Table;
