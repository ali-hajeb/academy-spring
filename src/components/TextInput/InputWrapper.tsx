import React from 'react';

export interface InputWrapperProps extends React.PropsWithChildren {}

const InputWrapper: React.FunctionComponent<InputWrapperProps> = ({
  children,
}) => {
  return <div className="mt-1 rounded-md shadow-sm">{children}</div>;
};

export default InputWrapper;
