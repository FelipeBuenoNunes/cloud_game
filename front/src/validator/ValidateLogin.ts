import {LoginValues} from '../utils/types';

function Validate(register: LoginValues) {
  const errors = {} as LoginValues ;
  if (!register.name) {
    errors.name = 'Nome é necessário';
  }
  if (register.account_number?.length != 5) {
    errors.account_number = 'Número da conta deve ter 5 dígitos';
  }
  if (register.account_verification_code?.length != 1) {
    errors.account_verification_code = 'Código de verificação da conta deve ter 1 dígito';
  }
  if (register.agency_number?.length != 3) {
    errors.agency_number = 'Número da agência deve ter 3 dígitos';
  }
  if (register.agency_verification_code?.length != 1) {
    errors.agency_verification_code = 'Código de verificação da agência deve ter 1 dígito';
  }
  if (register.password?.length != 4) {
    errors.password = 'Senha deve ter 4 dígitos';
  }
  return errors;
}

export default Validate;
