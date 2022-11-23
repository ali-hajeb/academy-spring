import React from 'react';

export interface InputWrapperProps extends React.PropsWithChildren {}

const InputWrapper: React.FunctionComponent<InputWrapperProps> = ({
  children,
}) => {
  return <div className="mt-1 bg-white rounded-md shadow-sm flex items-center px-3 py-2 border border-gray-300">{children}</div>;
};

export default InputWrapper;
