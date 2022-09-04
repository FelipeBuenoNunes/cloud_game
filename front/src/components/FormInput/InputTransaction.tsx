/* eslint-disable react/react-in-jsx-scope */
import { ChangeEventHandler } from 'react';

interface PropTypes {
  name: string;
  handleChange?: ChangeEventHandler<HTMLInputElement>;
  type: string;
  value?: string;
  placeHolder: string;
  error: string | undefined,
  formSection: boolean,
  readOnly: boolean,
}

export default function InputTransaction({
  name,
  handleChange,
  value,
  error,
  type,
  placeHolder,
  formSection,
  readOnly,
}:PropTypes) {

  return (
    <div className='flex-col'>
      <input
        placeholder={placeHolder}
        type={type}
        name={name}
        value={value || ''}
        onChange={handleChange}
        className={`
        ${readOnly ? 'bg-input-readonly text-input-placeholder' : 'bg-input-base text-paragraph-dark'}
        w-28 pl-2.5 py-1.5 border-2 rounded-md border-input-border h-8 `}
        disabled={readOnly}/>

      {error && <label className='text-input-error mt-[-20px] w-[250px] ml-[10px] text-[10px]'>{error}</label>}
      {formSection ? (<span className=" mt-0.5 font-normal text-xs leading-3 text-input-inactive" >{formSection}</span>) : null}
    </div>
  );
}
