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

export default function FormInput({
  name,
  handleChange,
  value,
  error,
  type,
  placeHolder,
  formSection,
  readOnly,
}:PropTypes) {

  let mainPagesCSS = 'w-28 pl-2.5 py-1.5 border-2 rounded-md border-input-border h-8 ';
  if(formSection){
    readOnly ? mainPagesCSS += 'bg-input-readonly text-input-placeholder' : mainPagesCSS += 'bg-input-base text-paragraph-dark';
  }
  const loginPageCSS = 'font-normal mb-3 px-2.5 gap-1.5 text-input-text w-[250px] h-[33px] border-2 rounded-[5px] border-input-border text-input-placeholder text-base';
  return (
    <>
      <input
        placeholder={placeHolder}
        type={type}
        name={name}
        value={value || ''}
        onChange={handleChange}
        className={
          `${formSection ? mainPagesCSS : loginPageCSS }`
        }
        disabled={readOnly}/>
      {error && <label className='text-input-error mt-[-20px] w-[250px] ml-[10px] text-[10px]'>{error}</label>}
      {formSection ? (<span className=" mt-0.5 font-normal text-xs leading-3 text-input-inactive" >{name}</span>) : null}
    </>
  );
}
