import { ReactNode, createContext, useState, useContext } from 'react';

interface ContextTypes {
  user: UserTypes;
  account: AccountTypes;
  loading: boolean;
}

interface AccountTypes{
  password: string;
  agency_number: number,
  agency_verification_code: number,
  account_number: number,
  account_verification_code: number,
  balance: number
}
interface TransactionTypes{
  type: string;
  date: string;
  tax: number;
  value: number
}
interface ExtractTypes{
  account: AccountTypes,
  transactions: Array<TransactionTypes>
}

interface UserTypes {
  name: string;
  email: string;
  cpf: string;
  birthDate: string;
  password: string;
  account: Partial<AccountTypes>
  extract: Partial<ExtractTypes>
}

export const UserContext = createContext<Partial<ContextTypes>>({});

interface UserProviderTypes {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderTypes) => {
  const [user, setUser] = useState<UserTypes>({
    name: '',
    email: '',
    cpf: '',
    password: '',
    birthDate: '',
    account: {},
    extract: {}
  });
  const [loading, setLoading] = useState(true);
  return (
    <UserContext.Provider
      value={{
        user,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
