/* eslint-disable react/react-in-jsx-scope */
import React, { MouseEventHandler } from 'react';


interface PropTypes {
  children: React.ReactNode;
}

export default function Header ({
  children
}: PropTypes) {
  return (
    <div
      className={
        'w-screen flex flex-col bg-[#337782] items-center rounded-b-3xl mb-7'
      }
    >
      {children}
    </div>
  );
}
