/* eslint-disable react/react-in-jsx-scope */
import React, { MouseEventHandler } from 'react';
import ArrowLoading from '../../assets/vectors/arrow_loading.svg';
interface PropTypes {
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  loading: boolean;
  children: string;
}

export default function FormInput({
  handleClick,
  children,
  loading
}:PropTypes) {

  return (

    <button
      onClick={handleClick}
      className={
        'text-btn-text p-2 h-[40px] w-[250px] border-0 rounded-md bg-btn-primary-base flex justify-center'
      }
    >
      {!loading ? children :
        (<div className="animate-spin inline-block">
          <img className=' h-[25px]' src={ArrowLoading} alt="a" />
        </div>)
      }
    </button>

  );
}
