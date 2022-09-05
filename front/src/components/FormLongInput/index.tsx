/* eslint-disable react/react-in-jsx-scope */
import { ChangeEventHandler } from 'react';

interface PropTypes {
  name: string;
  handleChange?: ChangeEventHandler<HTMLInputElement>;
  type: string;
  value?: string;
  placeHolder?: string;
  error: string | undefined
  readOnly: boolean;
}

export default function FormInput({
  name,
  handleChange,
  value,
  error,
  type,
  placeHolder,
  readOnly,
}:PropTypes) {

  return (
    <div className='flex flex-col'>
      <input
        placeholder={placeHolder}
        type={type}
        name={name}
        value={value || ''}
        onChange={handleChange}
        className={
          `pl-2.5 ${name == 'password' ? 'mb-4' : 'mb-5'} py-1.5 border-2 rounded-md border-input-border w-64 h-8  bg-input-base text-paragraph-dark`
        }
        disabled={readOnly}
      />
      {error && <label className='text-input-error mt-[-20px] w-[250px] ml-[10px] text-[10px]'>{error}</label>}
    </div>
  );
}