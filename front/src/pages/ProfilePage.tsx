/* eslint-disable react/react-in-jsx-scope */
import { useUser } from '../providers/UserProvider';
import HeaderProfile from '../components/HeaderProfile';
import MainTitle from '../components/MainTitle';
import documentIcon from '../assets/vectors/document-icon.svg';
import walletIcon from '../assets/vectors/wallet-icon.svg';
import {useEffect} from 'react';

function Row({children}){
  return (
    <div className={
      'w-11/12 bg-transparent flex flex-col gap-0.5 justify-start items-start my-1 text-sm text-input-placeholder'
    }>
      {children}
    </div>
  );
}

function Container({children}){
  return (
    <div className={
      'w-[90%] mb-3 h-full flex flex-col bg-body-light-100 dark:bg-body-dark items-center justify-center'
    }>
      {children}
    </div>
  );
}

function MainContainer({children}){
  return (
    <div
      className={
        'w-screen h-full flex flex-col bg-transparent items-center justify-center'
      }
    >
      <main
        className={
          'w-5/6 flex flex-col bg-white dark:bg-body-dark dark:border-btn-secondary-base dark:border items-center justify-center rounded-lg'
        }
      >
        {children}
      </main>

    </div>

  );
}


export default function ProfilePage () {
  const { user } = useUser();

  return (
    <div className=' w-screen min-h-screen  bg-body-light-200 dark:bg-body-dark flex flex-col items-center gap-2'>
      <HeaderProfile />
      <MainContainer>
        <MainTitle title='Meus dados' iconSrc={documentIcon} bell={false} />
        <Container>
          <Row>Nome: {user?.name}</Row>
          {user?.email && <Row>Email: {user?.email}</Row>}
          {user?.birthdate && <Row>Data de Nascimento: {user?.birthdate}</Row>}
          {user?.cpf && <Row>CPF: {user?.cpf}</Row>}
        </Container>
      </MainContainer>

      <MainContainer>
        <MainTitle title='Minhas contas corretes' iconSrc={walletIcon} bell={false} />
        <Container>
          <Row>Agência: {user?.account.agency_number}-{user?.account.agency_verification_code}</Row>
          <Row>Conta: {user?.account.account_number}-{user?.account.account_verification_code}</Row>
        </Container>
      </MainContainer>
    </div>
  );
}
