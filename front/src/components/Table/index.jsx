import ContainerPlayer from "../ContainerPlayer";

const Table = ({ children }) => {
  // bg-boardMobile
  return (
    <>
      <section className="bg-boardMobile bg-no-repeat bg-cover bg-center w-screen h-screen flex flex-col md:bg-boardDesktop">
        <div className="w-full min-h-[70px] bg-[#BA1616] mt-0">header</div>

        <section className="w-full min-h-[140px] bg-gray-500 flex justify-center items-center gap-x-4 ">
          <span className="w-[75px] h-[100px] border-4 border-black "></span>
          <span className="w-[75px] h-[100px] border-4 border-black "></span>
        </section>

        <ContainerPlayer className="mb-0" />

        <section className="w-full h-[200px] bg-[#00008B] flex flex-row justify-center items-center gap-x-1 " >
          <div className="w-[30%] h-[50px] bg-gray-500 text-center text-4xl" onClick={() => {console.log('stop')}} >stop</div>
          <div className="w-[30%] h-[50px] bg-gray-500 text-center text-4xl" onClick={() => {console.log('hit')}} >hit</div>
          <div className="w-[30%] h-[50px] bg-gray-500 text-center text-4xl" onClick={() => {console.log('double')}} >double</div>
        </section>
      </section>
    </>
  );
};

export default Table;
