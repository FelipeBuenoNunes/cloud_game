const ContainerButtons = ({ className }) => {
  return (
    <section className={`w-full mx-auto p-4 bg-transparent flex flex-row justify-center items-center gap-x-1 text-BJwhite font-medium text-center text-2xl md:text-4xl [&>*]:bg-BJbrown ${className}`} >
      <div className="max-w-[150px] w-[30%] " onClick={() => { console.log('stop') }} >stop</div>
      <div className="max-w-[150px] w-[30%] " onClick={() => { console.log('hit') }} >hit</div>
      <div className="max-w-[150px] w-[30%] " onClick={() => { console.log('double') }} >double</div>
    </section>
  )
}

export { ContainerButtons };