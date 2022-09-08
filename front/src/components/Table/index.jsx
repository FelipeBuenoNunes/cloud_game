import ContainerPlayer from "../ContainerPlayer";

const Table = ({children}) => {
  return (
    <>
      <div className="bg-boardMobile bg-no-repeat bg-cover bg-center w-screen h-screen flex flex-col md:bg-boardDesktop">
        <div className="w-full h-[163px] bg-[#BA1616] mt-0" >header</div>
        <div className="w-full h-[140px] bg-gray-500" >
          dealer
        </div>
        <ContainerPlayer className="mb-0" />
      </div>
    </>
  );
};

export default Table;
