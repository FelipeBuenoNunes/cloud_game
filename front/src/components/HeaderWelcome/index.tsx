/* eslint-disable react/react-in-jsx-scope */
import userIcon from '../../assets/vectors/icon-user.svg';
import {Link} from 'react-router-dom';
interface PropTypes {
  userName: string;
}

export default function HeaderWelcome ({
  userName,
}: PropTypes) {
  return (
    <div className={'w-5/6 bg-transparent flex justify-between my-2 p-2'}>
      <p className={'text-header-light text-xl flex justify-between'}>
        Bem-vindo, {userName}
      </p>
      <Link to={'/profile'}>
        <img src={userIcon} />
      </Link>
    </div>
  );
}
