/* eslint-disable react/react-in-jsx-scope */
import React, { MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';

interface PropTypes {
  children: string;
  imgSource: string;
  name: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type: 'submit' | 'button' | 'reset' | undefined;
}

export default function Button ({
  onClick,
  children,
  imgSource,
  name,
  type
}: PropTypes) {
  return (
    <div
      className={
        'w-15 flex flex-col items-center'
      }
    >
      <button
        onClick={onClick}
        type={type}
        className={
          'w-14 h-11 bg-btn-primary-base rounded-md border-0 flex justify-center'
        }
        name={name}
        desiredpage={name}
      >
        <img src={imgSource} alt={name} desiredpage={name}/>
      </button>

      <p
        className={
          'text-center text-xs text-icon-light '
        }
        desiredpage={name}
      >
        {children}
      </p>

    </div>
  );
}

