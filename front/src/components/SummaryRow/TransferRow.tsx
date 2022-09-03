/* eslint-disable react/react-in-jsx-scope */

interface PropTypes {
  date: string;
  transferSend?: string;
  transferReceived?: string;
  destiny?: string;
  fee?: string;
  origin?:string
}

export default function TransferRow ({
  date,
  transferSend,
  transferReceived,
  destiny,
  origin,
  fee
}: PropTypes) {
  return (
    <div
      className={
        'w-11/12 mb-2 bg-transparent flex flex-col gap-0.5 justify-start items-start my-1'
      }
    >
      <h2
        className={
          'text-sm text-input-text'
        }
      >
        {date}
      </h2>


      {
        destiny &&
        <p
          className='w-full flex justify-between'
        >
          <span className='text-input-inactive'>Destino</span>
          <span className='text-input-inactive'>{destiny}</span>
        </p>
      }
      {
        origin &&
        <p
          className='w-full flex justify-between'
        >
          <span className='text-input-inactive'>Origem</span>
          <span className='text-input-inactive'>{origin}</span>
        </p>
      }
      {
        transferSend &&
        <p
          className='w-full flex justify-between'
        >
          <span className='text-input-inactive'>Transferências enviadas</span>
          <span className='text-input-error'>- ${transferSend}</span>
        </p>
      }
      {
        fee &&
        <p
          className='w-full flex justify-between'
        >
          <span className='text-input-inactive'>Tarifas bancárias</span>
          <span className='text-input-error'>- ${fee}</span>
        </p>
      }

      {
        transferReceived &&
        <p
          className='w-full flex justify-between'
        >
          <span className='text-input-inactive'>Transferências recebidas</span>
          <span className='text-[#53D496]'>${transferReceived}</span>
        </p>
      }

    </div>
  );
}
