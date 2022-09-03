export interface RegisterValues{
  email: string;
  name: string;
  password: string;
  confirm_password: string;
  birthdate: string;
  cpf: string;
  server: string;
}

export interface LoginValues{
  agency_number: string;
  agency_verification_code: string;
  account_number: string;
  account_verification_code: string;
  password: string;
  name: string;
  server: string
}
