/* eslint-disable react/react-in-jsx-scope */
import MainContainer from '../components/MainContainer';
import MainTitle from '../components/MainTitle';
import voucherIcon from '../assets/vectors/voucher-icon.svg';
import { useLocation } from 'react-router-dom';
import { parseDate } from '../utils/date';

export default function PaymentVoucher() {
  const location = useLocation()

  return (
    <MainContainer>
      <MainTitle title='Comprovante de transação' iconSrc={voucherIcon} bell={false} />
      <div
        className={
          'w-11/12 mb-2 p-3 bg-body-light-100 dark:bg-body-dark flex flex-col gap-0.5 justify-start items-start my-1'
        }
      >
        <p
          className='w-full font-medium flex justify-between'
        >
          <span className='text-paragraph-light-200'> Tipo: {location.state.type} </span>
        </p>
        <p
          className='w-full flex justify-between'
        >
          <span className='text-paragraph-light-100'> Data: {parseDate(Date.now())}
          </span>
        </p>
        <p
          className='w-full font-medium flex justify-between'
        >
          <span className='text-paragraph-light-200'>Valor</span>
          <span className={location.state.type == 'Deposito' ? 'text-[#53D496]' : 'text-input-error'}>- ${location.state.value}</span>
        </p>
      </div>

    </MainContainer>
  );
}
