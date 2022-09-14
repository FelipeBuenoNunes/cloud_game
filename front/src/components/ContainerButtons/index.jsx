const ContainerButtons = ({ className }) => {
  return (
    <section className={`w-full h-[70px] mx-auto px-2 bg-transparent flex flex-row justify-center items-center gap-x-1 text-white font-medium text-center text-4xl ${className}`} >
      <div className="w-[150px] h-[50px] bg-[#440e0b] " onClick={() => { console.log('stop') }} >stop</div>
      <div className="w-[150px] h-[50px] bg-[#440e0b] " onClick={() => { console.log('hit') }} >hit</div>
      <div className="w-[150px] h-[50px] bg-[#440e0b] " onClick={() => { console.log('double') }} >double</div>
    </section>
  )
}

export default ContainerButtons;