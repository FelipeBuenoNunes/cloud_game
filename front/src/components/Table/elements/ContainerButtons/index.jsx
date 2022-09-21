const ContainerButtons = ({ className, wsSend }) => {
  return (
    <section className={`w-full mx-auto p-4 bg-transparent flex flex-row justify-center items-center gap-x-1 text-BJwhite font-medium text-center text-2xl md:text-4xl [&>*]:bg-BJbrown ${className}`} >
      <button className="max-w-[150px] w-[30%] " onClick={() => { wsSend(JSON.stringify({"name": "stop"})) }} >stop</button>
      <button className="max-w-[150px] w-[30%] " onClick={() => { wsSend(JSON.stringify({"name": "get_card"})) }} >hit</button>
      <button className="max-w-[150px] w-[30%] " onClick={() => { wsSend(JSON.stringify({"name": "double_bet"})) }} >double</button>
    </section>
  )
}

export { ContainerButtons };