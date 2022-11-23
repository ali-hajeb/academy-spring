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
    <div className='shadow-xl bg-gray-100 h-screen mx-auto p-4 rounded-md flex flex-row justify-center items-center w-4/5'>
      <div className='border-2 border-blue-600 p-5 rounded-md bg-white h-4/5 w-1/2' >
      <form className="flex flex-col justify-between h-full w-full mx-auto " onSubmit={formSubmitHandler}>{children}</form>
      </div>
    
    
    </div>
  );
};

export default UserFormBox;
