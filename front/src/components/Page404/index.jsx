import { useNavigate } from 'react-router-dom'

const Page404 = () => {
  const navigation = useNavigate();
  return (
    <section className="w-screen h-screen flex flex-col justify-center items-center" >
      <div className=" bg-white w-[50vh] h-[50vh] max-w-[90%] flex flex-col justify-center items-center gap-y-4"  >
        <h2>Pagina não encontrada</h2>
        <button onClick={() => { navigation('/') }} className="bg-blue-500 rounded-md px-4 text-white ">Home</button>
      </div>
    </section>
  );
};

export default Page404;