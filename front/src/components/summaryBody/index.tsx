/* eslint-disable react/react-in-jsx-scope */


interface PropTypes {
  children: React.ReactNode;
}

export default function SummaryBody ({
  children
}: PropTypes) {
  return (
    <div
      className={
        'w-11/12 h-auto p-px flex flex-col bg-body-light-100 dark:bg-body-dark items-center justify-center rounded-lg'
      }
    >

      {children}

    </div>
  );
}
