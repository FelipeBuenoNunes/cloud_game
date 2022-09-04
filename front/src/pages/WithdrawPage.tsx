/* eslint-disable react/react-in-jsx-scope */
import MainContainer from '../components/MainContainer';
import MainTitle from '../components/MainTitle';
import { useState } from 'react';
import withdrawOrangeIcon from '../assets/vectors/icon-withdraw-orange.svg';
import InputTransaction from '../components/FormInput/InputTransaction';
import FormButton from '../components/FormButton';
import FormLongInput from '../components/FormLongInput';
import { useUser } from '../providers/UserProvider';
import { LoginValues } from '../utils/types';
import FormTitle from '../components/FormTitle';
import { Modal } from '../components/Modal/Modal';
import { useNavigate } from 'react-router-dom';

export default function WithdrawPage () {
  const { user } = useUser();
  const [values, setValues] = useState({} as LoginValues);
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
      account: user?.account,
      value: parseFloat(values.value)
    };

    setLoading(true);
    fetch('http://localhost:8000/draft', {
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
        if(res.message != 'Success'){
          setServerError(res.data)
          return
        } ;
        user.extract = res.data;
        user.account.balance -= parseFloat(values.value) + 4
        navigate('/home/voucher', {state: {value: values.value, type: 'Saque'}})
      })
      .catch(err => console.log(err));
  }

  return (
    <>
     {modal && (
        <Modal
          title="Saque"
          setModal={setModal}
          handleConfirmModal={handleClick}
        />
      )}
      <MainContainer>
        <MainTitle title='Saque' iconSrc={withdrawOrangeIcon} bell={false} />
        <div className='mb-3.5 flex flex-col px-6'>
          <FormTitle title={'Dados para saque'} />
          <div className='flex'>
            <InputTransaction type='text' name='agency' placeHolder={`${user.account.agency_number}` + '-' +`${user.account.agency_verification_code}`} readOnly={true} value={values.agency_number} formSection='Agência' />
            <div className='w-8'></div>
            <InputTransaction type='text' name='account' placeHolder={ `${user.account.account_number}` + '-' +`${user.account.account_verification_code}`} readOnly={true} value={values.account_number} formSection='Conta' />
          </div>
        </div>
        <FormLongInput type='text' name='value' placeHolder='Valor' value={values.value} handleChange={handleChange} readOnly={false}/>
        <FormLongInput type='password' name='password' placeHolder='Senha' value={values.password} handleChange={handleChange} readOnly={false}/>
        {serverError && <p className='text-input-error w-[250px] ml-[10px] text-[10px]'>{serverError}</p>}
        <FormButton loading={loading} handleClick={()=> setModal(true)}>Sacar</FormButton>
      </MainContainer>
    </>
  );
}
