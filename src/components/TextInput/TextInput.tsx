import React, { useMemo } from 'react';
import InputGroup from './InputGroup';
import InputWrapper from './InputWrapper';

export interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
  placeholder?: string;
  inputClassName?: string;
  wrapperClassName?: string;
  required?: boolean;
  icon?: React.ReactNode;
  disabled?: boolean;
  error?: string | React.ReactNode;
}

const TextInput: React.FunctionComponent<TextInputProps> = (props) => {
  const {
    wrapperClassName,
    inputClassName,
    id,
    label,
    icon,
    error,
    ...inputProps
  } = props;

  const inputClassList = useMemo(() => {
    const classList = [
      'appearance-none rounded-md relative block w-full px-3 mx-auto py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-600 focus:border-blue-600 focus:z-10 sm:text-sm',
    ];
    if (error) classList.push('border-pink-500 text-pink-600 focus:border-pink-500 focus:ring-pink-500');
    if (inputClassName) classList.push(inputClassName);
    return classList;
  }, [inputClassName, error]);

  return (
    <InputGroup className={wrapperClassName}>
      <label htmlFor={id} className="mx-auto">{label}</label>
      <InputWrapper>
        <input id={id} className={inputClassList.join(' ')} {...inputProps} />
      </InputWrapper>

      {error && <div className="text-pink-500 font-medium text-sm">{error}</div>}
    </InputGroup>
  );
};

export default TextInput;
