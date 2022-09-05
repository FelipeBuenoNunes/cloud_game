/* eslint-disable react/react-in-jsx-scope */


interface PropTypes {
  children: React.ReactNode;
}

export default function MainContainer ({
  children
}: PropTypes) {
  return (
    <div
      className={
        'w-screen h-full flex flex-col bg-transparent items-center justify-center'
      }
    >
      <main
        className={
          'w-5/6 pb-4 flex flex-col bg-white dark:bg-body-dark dark:border-btn-secondary-base dark:border items-center justify-center rounded-lg'
        }
      >
        {children}
      </main>

    </div>
  );
}
