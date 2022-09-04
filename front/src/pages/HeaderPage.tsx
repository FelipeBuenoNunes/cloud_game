/* eslint-disable react/react-in-jsx-scope */
import { Route, Routes, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Header from '../components/Header';
import HeaderRow from '../components/HeaderRow';
import HeaderSummary from '../components/HeaderSummary';
import HeaderWelcome from '../components/HeaderWelcome';
import summaryIcon from '../assets/vectors/icon-summary.svg';
import transferIcon from '../assets/vectors/icon-transfer.svg';
import depositIcon from '../assets/vectors/icon-deposit.svg';
import withdrawIcon from '../assets/vectors/icon-withdraw.svg';
import { useUser } from '../providers/UserProvider';

export default function HeaderPage () {
  const {user} = useUser();
  const navigate = useNavigate();

  function handleClick (event) {
    console.log(event.target.getAttribute('desiredpage'));
    const page = event.target.getAttribute('desiredpage');
    navigate(page);
  }

  return (
    <>
      <Header>
        <HeaderWelcome userName={user.name} />
        <HeaderRow>
          <Button type="button" imgSource={summaryIcon} name="summary" onClick={handleClick}>
            Extrato
          </Button>
          <Button type="button" imgSource={transferIcon} name="transfer" onClick={handleClick}>
            Transferir
          </Button>
          <Button type="button" imgSource={depositIcon} name="deposit" onClick={handleClick}>
            Depositar
          </Button>
          <Button type="button" imgSource={withdrawIcon} name="withdraw" onClick={handleClick}>
            Sacar
          </Button>
        </HeaderRow>
        <HeaderSummary
          agency={`${user?.account.agency_number}-${user?.account.agency_verification_code}`}
          account={`${user?.account.account_number}-${user?.account.account_verification_code}`}
          balance={user?.account?.balance?.toFixed(2).replace('.',',')}
        />
      </Header>
    </>
  );
}
