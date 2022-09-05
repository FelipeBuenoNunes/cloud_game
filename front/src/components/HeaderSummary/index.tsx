/* eslint-disable react/react-in-jsx-scope */
import showIcon from '../../assets/vectors/icon-show.svg';
import arrowIcon from '../../assets/vectors/icon-arrow.svg';

interface PropTypes {
  agency: string;
  account: string;
  balance: string;
}

export default function HeaderSummary ({
  agency,
  account,
  balance
}: PropTypes) {
  return (
    <div
      className={
        'w-5/6 bg-white flex flex-col justify-between my-2 p-2 rounded-lg drop-shadow-lg -mb-5'
      }
    >

      <p
        className={
          'text-header-gold text-sm flex justify-between'
        }
      >
        <span>Agência: {agency} Conta: {account}</span> <img src={arrowIcon} className={'inline'} />
      </p>

      <p
        className={
          'text-header-dark'
        }
      >
        <img src={showIcon} className={'inline align-baseline'} /> <span className={'text-2xl text-brand-base'}>{balance}</span> <span className={'text-sm text-brand-hover'}>R$</span>
      </p>

    </div>
  );
}
