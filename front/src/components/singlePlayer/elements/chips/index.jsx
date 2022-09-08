const Chips = ({value}) => {
  return(
    <section className="w-full" >
      <div className="bg-white text-black font-medium border-2 border-black text-center" >
        {value}
      </div>
    </section>
  );
};
export default Chips;