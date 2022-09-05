import {RegisterValues} from '../utils/types';

function Validate(register: RegisterValues) {
  const errors = {} as RegisterValues ;
  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const { name, email, birthdate, cpf, password, confirm_password } = register;
  if (!name) {
    errors.name = 'Nome é necessário';
  }
  if (!cpf) {
    errors.cpf = 'Cpf é necessário';
  }else if(cpf.length != 11){
    errors.cpf = 'Cpf deve conter 11 dígitos';
  }

  if (!email) {
    errors.email = 'Email é necessário';
  } else if (!emailRegex.test(email)) {
    errors.email = 'Email é inválido';
  }
  const dateUS = new Date(birthdate);
  const dateNow = new Date();

  if (!birthdate) {
    errors.birthdate = 'Data de nascimento é necessária';
  } else if (dateUS > dateNow) {
    errors.birthdate = 'Sua data de nascimento é maior que a data atual';
  }

  if (!password) {
    errors.password = 'Senha é necessária';
  } else if (password.length < 4) {
    errors.password = 'Senha é muito curta';
  } else if (password.length > 4) {
    errors.password = 'Senha é muito longa';
  }

  if (!confirm_password) {
    errors.confirm_password = 'Confirmação de senha é necessária';
  } else if (password !== confirm_password) {
    errors.confirm_password = 'Senha é diferente da confirmação de senha';
  }

  return errors;
}

export default Validate;
