/* eslint-disable react/react-in-jsx-scope */

interface PropTypes {
  children: React.ReactNode;
}

export default function HeaderRow ({
  children
}: PropTypes) {
  return (
    <div
      className={
        'w-5/6 flex justify-between my-2'
      }
    >
      {children}
    </div>
  );
}
