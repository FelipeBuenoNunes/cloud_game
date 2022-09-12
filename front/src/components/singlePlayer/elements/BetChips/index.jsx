const BetChips = ({ valueBet = 0, className }) => {
  return (
    <section className={`bg-[#2227] mt-2 px-1 max-h-6  ${className}`} >
      <div className="text-yellow-300 font-medium text-sm" >{valueBet}</div>
    </section>
  );
};

export default BetChips;