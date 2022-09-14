// import Header from "../Header";
// import ContainerDealer from "../ContainerDealer";
// import ContainerPlayer from "../ContainerPlayer";
// import ContainerButtons from "./elements/ContainerButtons";

import { Header, ContainerDealer, ContainerPlayer, ContainerButtons } from './elements';

const Table = ({ children }) => {
  return (
    <>
      <section className="bg-boardMobile bg-no-repeat bg-cover object-contain bg-center w-screen h-screen flex flex-col md:bg-boardDesktop">
        <Header className={`h-[10%] md:5%`} />
        <ContainerDealer className={`h-[10%] md:5%`} />
        <ContainerPlayer className={``} />
        <ContainerButtons className={`h-[10%] md:5%`} />
      </section>
    </>
  );
};

export default Table;
