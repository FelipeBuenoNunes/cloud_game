/* eslint-disable react/react-in-jsx-scope */
import Header from '../Header';
import arrowIcon from '../../assets/vectors/arrow.svg';
import { Link } from 'react-router-dom';
import userImage from '../../assets/images/image-user.png';
import { useUser } from '../../providers/UserProvider';

export default function HeaderProfile () {
  const { user } = useUser();
  return (
    <Header>
      <div className={'h-[200px] pl-2 pt-1 w-screen  my-3 ml-3'}>
        <Link className='w-[25px] justify-self-start' to={'/home'}>
          <img className='w-[25px]' src={arrowIcon} alt="icon" />
        </Link>
        <div className='flex flex-col justify-center items-center self-center'>
          <img className='w-24 h-24' src={userImage} alt="user" />
          <h3 className='text-header-light text-xl mt-4'>{user.name}</h3>
        </div>
      </div>
    </Header>
  );
}
