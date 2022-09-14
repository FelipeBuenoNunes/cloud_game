const ContainerDealer = ({ className }) => {
  return (
    <section className={`w-full h-[10vh] bg-transparent flex justify-center items-center gap-x-4 ${className}`}>
      <span className="w-[75px] h-[80%] border-4 border-black "></span>
      <span className="w-[75px] h-[80%] border-4 border-black "></span>
    </section>
  )
}
export default ContainerDealer