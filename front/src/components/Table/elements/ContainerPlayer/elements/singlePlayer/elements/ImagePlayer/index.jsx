
const ImagePlayer = ({ className }) => {
  return (
    <section className={`m-2 ${className}`} >
      {/* <div style={{ backgroundColor: "#222" }} className=" w-[50px] h-[50px] rounded-full" ></div> */}
      <img src={process.env.PUBLIC_URL + './assets/AA.png'} alt="profile picture" className="rounded-full w-[50px]" />
    </section>
  );
};

export default ImagePlayer;