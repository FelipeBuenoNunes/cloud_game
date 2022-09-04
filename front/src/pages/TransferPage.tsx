/* eslint-disable react/react-in-jsx-scope */
import MainContainer from '../components/MainContainer';
import MainTitle from '../components/MainTitle';
import { useState } from 'react';
import transferIcon from '../assets/vectors/transfer-icon.svg';
import InputTransaction from '../components/FormInput/InputTransaction';
import FormButton from '../components/FormButton';
import FormLongInput from '../components/FormLongInput';
import FormTitle from '../components/FormTitle';
import { useUser } from '../providers/UserProvider';
import { Modal } from '../components/Modal/Modal';
import { useNavigate } from 'react-router-dom';

export default function SummaryPage () {
  const { user } = useUser();
  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [modal, setModal] = useState(false)
  const navigate = useNavigate()

  function handleChange (event) {
    const name = event.target.name;
    const value = event.target.value;
    setValues(values => ({...values, [name]: value}));
  }
  function handleClick (event) {
    console.log('1')
    const [agency_number, agency_verification_code] = values.agency_number.split('-');
    const [account_number, account_verification_code] = values.account_number.split('-');
    console.log('2')

    const requestBody = {
      destiny_account: {
        agency_number: parseInt(agency_number),
        agency_verification_code: parseInt(agency_verification_code),
        account_number: parseInt(account_number),
        account_verification_code: parseInt(account_verification_code)
      },
      origin_account: user.account,
      value: parseFloat(values.value),
    };
    if(values.password != user.account.password){
      setServerError('Senha errada')
      setModal(false)
      return null;
    }
    setLoading(true);
    fetch('http://localhost:8000/transfer', {
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
          return;
        }
        user.extract = res.data;
        user.account.balance -= parseFloat(values.value)
        navigate('/home/voucher', {state: {value: values.value, type: 'Transferência'}})
      })
      .catch(err => console.log(err));
  }

  return (
    <>
      {modal && (
        <Modal
          title="Transferência"
          setModal={setModal}
          handleConfirmModal={handleClick}
        />
      )}
      <MainContainer>
        <MainTitle title='Transferência' iconSrc={transferIcon} bell={false} />
        <div className='mb-3.5 flex flex-col px-6'>
          <FormTitle title={'Origem'} />
          <div className='flex'>
            <InputTransaction type='text' name='agency' placeHolder={`${user?.account.agency_number}` + '-' +`${user?.account.agency_verification_code}`} readOnly={true}  formSection='Agência' />
            <div className='w-8'></div>
            <InputTransaction type='text' name='account' placeHolder={ `${user?.account.account_number}` + '-' +`${user?.account.account_verification_code}`} readOnly={true} formSection='Conta'/>
          </div>
        </div>
        <div className='mb-3.5 flex flex-col px-6'>
          <FormTitle title={'Destino'} />
          <div className='flex'>
            <InputTransaction type='text' name='agency_number' value={values?.agency_number} handleChange={handleChange} formSection='Agência' />
            <div className='w-8'></div>
            <InputTransaction type='text' name='account_number' value={values?.account_number} handleChange={handleChange} formSection='Conta'/>
          </div>
        </div>
        <FormLongInput type='text' name='value' placeHolder='Valor' value={values?.value} handleChange={handleChange} readOnly={false} />
        <FormLongInput type='password' name='password' placeHolder='Senha' value={values?.password} handleChange={handleChange} readOnly={false} />
        {serverError && <p className='text-input-error w-[250px] ml-[10px] text-[10px]'>{serverError}</p>}
        <FormButton loading={loading} handleClick={()=> setModal(true)} >Transferir</FormButton>
      </MainContainer>
    </>
  );
}
