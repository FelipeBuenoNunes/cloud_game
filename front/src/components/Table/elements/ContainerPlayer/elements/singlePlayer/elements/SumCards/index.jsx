const SumCards = ({ sumOfCards = 0 }) => {
  return (
    <section className="" >
      <div className="text-center bg-[#2227] text-2xl" >
        {checkSum(sumOfCards)}
      </div>
    </section>
  );
};
export default SumCards;

const checkSum = (sum) => {
  const sumNumber = Number(sum);
  if (sumNumber < 21) {
    return (
      <div className="px-2 text-green-500" >
        {sumNumber}
      </div>
    );
  }
  if (sumNumber === 21) {
    return (
      <div className="px-2 text-yellow-400" >
        {sumNumber}
      </div>
    );
  }
  return (
    <div className="px-2 text-red-500" >
      {sumNumber}
    </div>
  );
};