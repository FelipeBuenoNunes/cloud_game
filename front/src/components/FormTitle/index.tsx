/* eslint-disable react/react-in-jsx-scope */
interface PropTypes {
  title: string;
  }
  
export default function FormTitle({
  title,
}:PropTypes) {

  return ( 
    <p className=' mb-2.5 text-paragraph-dark font-theme text-base font-normal leading-5 dark:text-header-light'>
      {title}
    </p>

  );
}