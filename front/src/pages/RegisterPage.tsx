/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import logoIcon from '../assets/vectors/logo.svg';
import { useUser } from '../providers/UserProvider';
import { Link } from 'react-router-dom';
import ValidateRegister from '../validator/ValidateRegister';
import { RegisterValues } from '../utils/types';
import { parseDate } from '../utils/date';

export default function RegisterPage () {
  const { user } = useUser();
  const [values, setValues] = useState({} as RegisterValues);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({} as RegisterValues);
  const [serverError,setServerError] = useState(false);
  const navigate = useNavigate();

  function handleChange (event) {
    const name = event.target.name;
    const value = event.target.value;
    user[name] = value;
    if(name == 'birthdate') user[name] = parseDate(value);
    setValues(values => ({...values, [name]: value}));
  }

  function handleClick (event) {
    const errors = ValidateRegister(values);
    setFormErrors(errors);
    setServerError(false)
    if(Object.keys(errors).length !== 0) return;
    setLoading(true);

    const requestBody = user

    fetch('http://localhost:8000/accounts', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
    })
      .then(res => res.json())
      .then(res => {
        setLoading(false);

        if(res.message != 'Success'){
          setServerError(res.data)
          return
        }
        console.log(res)
        user.account = res.data.account;
        navigate('/home');
      })
      .catch(err => console.log(err));
  }

  return (
    <div className='py-4 pt-10 w-screen bg-body-light-200 dark:bg-body-dark flex flex-col items-center gap-2'>
      <img src={logoIcon} className={'w-28'} />
      <p className='text-paragraph-dark dark:text-paragraph-light-100 text-xl font-medium mb-6'>Crie sua conta</p>
      <FormInput type='text' error={formErrors?.name} name='name' placeHolder='Nome' value={values.name} handleChange={handleChange} />
      <FormInput type='text' error={formErrors?.email} name='email' placeHolder='Email' value={values.email} handleChange={handleChange} />
      <FormInput type='text' error={formErrors?.cpf} name='cpf' placeHolder='Cpf' value={values.cpf} handleChange={handleChange} />
      <FormInput type='date' error={formErrors?.birthdate} name='birthdate' placeHolder='Data de nascimento' value={values.birthdate} handleChange={handleChange} />
      <FormInput type='password' error={formErrors?.password} name='password' placeHolder='Senha' value={values.password} handleChange={handleChange} />
      <FormInput type='password' error={formErrors?.confirm_password} name='confirm_password' placeHolder='Confirme sua senha' value={values.confirm_password} handleChange={handleChange} />
      <FormButton loading={loading} handleClick={handleClick}>Cadastrar</FormButton>
      {serverError && <p className='text-input-error w-[250px] ml-[10px] text-[10px]'>{serverError}</p>}
      <Link className='text-sm dark:text-paragraph-light-100' to={'/login'}>Entrar</Link>
    </div>
  );
}
