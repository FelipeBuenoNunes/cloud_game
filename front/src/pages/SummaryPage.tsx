/* eslint-disable react/react-in-jsx-scope */
import MainContainer from '../components/MainContainer';
import MainTitle from '../components/MainTitle';
import SummaryBody from '../components/summaryBody';
import summaryIcon from '../assets/vectors/icon-summary-orange.svg';
import { useEffect, useState } from 'react';
import { useUser } from '../providers/UserProvider';
import { parseDate } from '../utils/date';
import DepositRow from '../components/SummaryRow/DepositRow';
import TransferRow from '../components/SummaryRow/TransferRow';
import WithdrawRow from '../components/SummaryRow/WithdrawRow';

export default function SummaryPage () {
  const { user } = useUser();
  const [transactions, setTransactions] = useState();

  useEffect(() => {
    fetch('http://localhost:8000/extract', {
      method: 'POST',
      body: JSON.stringify({account: user?.account}),
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        if(res.message != 'Success'){
          return;
        }
        user.account.balance = res.data.account.balance;
        user.extract = res.data;
        console.log(res.data.transactions);
        setTransactions(res.data.transactions);
        console.log(transactions);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      <MainContainer>
        <MainTitle title='Extrato de transações' iconSrc={summaryIcon} bell={true} />
        <SummaryBody>
          {
            transactions?.map((transaction)=>{
              if(transaction.type == 'deposit'){
                return  <DepositRow
                  key={Math.random()}
                  date={parseDate(transaction.date)}
                  fee={transaction.tax}
                  value={(transaction.value + transaction.tax)}
                />;
              }else if(transaction.type == 'draft'){
                return  <WithdrawRow
                  key={Math.random()}
                  date={parseDate(transaction.date)}
                  fee={transaction.tax}
                  value={(transaction.value + transaction.tax)}
                />;
              }else{
                if(transaction.origin){
                  return  <TransferRow
                    key={Math.random()}
                    date={parseDate(transaction.date)}
                    fee={transaction.tax}
                    origin={transaction.origin}
                    transferReceived={(transaction.value + transaction.tax)}
                  />;
                }else{
                  return  <TransferRow
                    key={Math.random()}
                    date={parseDate(transaction.date)}
                    fee={transaction.tax}
                    destiny={transaction.destiny}
                    transferSend={(transaction.value - (transaction.tax *2))}
                  />;
                }
              }
            })
          }
        </SummaryBody>
      </MainContainer>

    </>
  );
}
