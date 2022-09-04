/* eslint-disable react/react-in-jsx-scope */
import { Route, Routes, useNavigate } from 'react-router-dom';
import MainContainer from '../components/MainContainer';
import MainTitle from '../components/MainTitle';
import { useState } from 'react';
import FormTitle from '../components/FormTitle';
import InputTransaction from '../components/FormInput/InputTransaction';
import FormButton from '../components/FormButton';
import FormLongInput from '../components/FormLongInput';
import { useUser } from '../providers/UserProvider';
import depositOrangeIcon from '../assets/vectors/deposit-icon.svg';
import { Modal } from '../components/Modal/Modal';
import { parseDate } from '../utils/date';
export default function DepositPage () {
  const { user } = useUser();
  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false)
  const [serverError, setServerError] = useState('')
  const navigate = useNavigate()

  function handleChange (event) {
    const name = event.target.name;
    const value = event.target.value;
    user.account[name] = value;
    if(name === 'name') user.name = value;
    setValues(values => ({...values, [name]: value}));
  }

  function handleClick (event) {

    const requestBody = {
      account: user.account,
      value: parseFloat(values.value)
    };
    setLoading(true);
    fetch('http://localhost:8000/deposit', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        setLoading(false);
        setModal(false)
        if(res.message != 'Success') {
          setServerError(res.data)
          return null
        }
        user.extract = res.data;
        user.account.balance += parseFloat(values.value) - (parseFloat(values.value) * 0.01);
        navigate('/home/voucher', {state: {value: values.value, type: 'Deposito', date: parseDate(Date.now())}})
      })
      .catch(err => console.log(err));
  }

  return (
    <>
      {modal && (
        <Modal
          title="Depósito"
          setModal={setModal}
          handleConfirmModal={handleClick}
        />
      )}
      <MainContainer>
        <MainTitle title='Depósito' iconSrc={depositOrangeIcon} bell={false} />
        <div className='mb-3.5 flex flex-col px-6'>
          <FormTitle title={'Dados para Depósito'} />
          <div className='flex'>
            <InputTransaction type='text' name='agency' placeHolder={`${user.account.agency_number}` + '-' +`${user.account.agency_verification_code}`} readOnly={true} value={values.agency_number} handleChange={handleChange} formSection='Agência' />
            <div className='w-8'></div>
            <InputTransaction type='text' name='account' placeHolder={ `${user.account.account_number}` + '-' +`${user.account.account_verification_code}`} readOnly={true} value={values.account_number} handleChange={handleChange} formSection='Conta'/>
          </div>
        </div>
        <FormLongInput type='text' name='value' placeHolder='Valor' value={values.value} handleChange={handleChange} readOnly={false}/>
        <FormLongInput type='password' name='password' placeHolder='Senha' value={values.password} handleChange={handleChange} readOnly={false}/>
        {serverError && <p className='text-input-error w-[250px] ml-[10px] text-[10px]'>{serverError}</p>}
        <FormButton loading={loading} handleClick={()=> setModal(true)}>Transferir</FormButton>
      </MainContainer>
    </>
  );
}
