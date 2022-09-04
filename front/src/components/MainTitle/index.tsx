/* eslint-disable react/react-in-jsx-scope */
import bellIcon from '../../assets/vectors/icon-bell.svg';

interface PropTypes {
  title: string;
  iconSrc: string;
  bell: boolean;
}

export default function MainTitle ({
  title,
  iconSrc,
  bell=false
}: PropTypes) {
  return (
    <div
      className={
        'w-11/12 bg-transparent flex gap-2 justify-start items-center my-1'
      }
    >
      <img src={iconSrc} />
      <p
        className={
          'text-base text-header-gold'
        }
      >
        {title}
      </p>

      {
        bell && <img src={bellIcon} className={'ml-auto'} />
      }


    </div>
  );
}
