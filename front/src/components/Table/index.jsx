import ContainerPlayer from "../ContainerPlayer";

const Table = ({ children }) => {
  // bg-boardMobile
  return (
    <>
      <section className="bg-boardMobile bg-no-repeat bg-cover object-contain bg-center w-screen h-screen flex flex-col md:bg-boardDesktop">
        <div className="w-full h-[5vh] bg-transparent mt-0">header</div>

        <section className="w-full h-[10vh] bg-transparent flex justify-center items-center gap-x-4 ">
          <span className="w-[75px] h-[80%] border-4 border-black "></span>
          <span className="w-[75px] h-[80%] border-4 border-black "></span>
        </section>

        <ContainerPlayer className={''} />

        <section className="w-full h-[70px] mx-auto px-2 bg-transparent flex flex-row justify-center items-center gap-x-1 " >
          <div className="w-[150px] h-[50px] bg-gray-500 text-center text-4xl" onClick={() => { console.log('stop') }} >stop</div>
          <div className="w-[150px] h-[50px] bg-gray-500 text-center text-4xl" onClick={() => { console.log('hit') }} >hit</div>
          <div className="w-[150px] h-[50px] bg-gray-500 text-center text-4xl" onClick={() => { console.log('double') }} >double</div>
        </section>
      </section>
    </>
  );
};

export default Table;
