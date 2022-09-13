// vai ter 3 imagens, que serão botoes: 
// sair
// duvidas/ajuda
// som
const exit = `${process.env.PUBLIC_URL}/assets/icons/exit.png`;
const sound = `${process.env.PUBLIC_URL}/assets/icons/sound.png`;
const help = `${process.env.PUBLIC_URL}/assets/icons/help.png`;

const Header = () => {
  return (
    <section className="flex flex-row justify-start items-center gap-x-1 ml-4" >
      <button onClick={() => { console.log('button exit') }} >
        <img src={exit} alt="" />
      </button>
      <button onClick={() => { console.log('button sound') }} >
        <img src={sound} alt="" />
      </button>
      <button onClick={() => { console.log('button help') }} >
        <img src={help} alt="" />
      </button>
    </section>
  );
};
export default Header;