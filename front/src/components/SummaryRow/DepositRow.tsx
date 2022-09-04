/* eslint-disable react/react-in-jsx-scope */

interface PropTypes {
  date: string;
  value?: string;
  fee?: string;
}

export default function DepositRow ({
  date,
  value,
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
        fee &&
        <p
          className='w-full flex justify-between'
        >
          <span className='text-input-inactive'>Tarifas bancárias</span>
          <span className='text-input-error'>- ${fee}</span>
        </p>
      }

      {
        value &&
        <p
          className='w-full flex justify-between'
        >
          <span className='text-input-inactive'>Depósitos</span>
          <span className='text-[#53D496]'>${value}</span>
        </p>
      }

    </div>
  );
}
