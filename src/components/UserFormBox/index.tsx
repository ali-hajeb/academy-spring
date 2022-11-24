import React from 'react';

export interface UserFormBoxProps extends React.PropsWithChildren {
  formSubmitHandler: (event: React.FormEvent<HTMLFormElement>) => void;
  formClassName?: string;
}

const UserFormBox: React.FunctionComponent<UserFormBoxProps> = ({
  children,
  formClassName,
  formSubmitHandler,
}) => {
  return (
    <section className='flex justify-center items-center my-10 h-full w-full'>
      <div className='py-2 px-2 w-full sm:w-[400px]'>
        <form className={formClassName} onSubmit={formSubmitHandler}>{children}</form>
      </div>
    </section>
  );
};

export default UserFormBox;
