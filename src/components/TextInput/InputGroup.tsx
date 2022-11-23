import React, { useMemo } from 'react';

export interface InputGroupProps extends React.PropsWithChildren {
  className?: string;
}

const InputGroup: React.FunctionComponent<InputGroupProps> = ({
  children,
  className,
}) => {
  const wrapperClassList = useMemo(() => {
    const classes = ['block mt-2 text-sm font-medium text-gray-700 mx-auto w-3/4 '];
    if (className) classes.push(className);
    return classes;
  }, [className]);
  return <div className={wrapperClassList.join(' ')}>{children}</div>;
};

export default InputGroup;
