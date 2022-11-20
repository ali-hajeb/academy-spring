import React, { useMemo } from 'react';

export interface TextInputProps {
  id: string;
  label?: string;
  type?: React.HTMLInputTypeAttribute;
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

  const wrapperClassList = useMemo(() => {
    const classList = ['block mt-2 text-sm font-medium text-gray-700'];
    if (error) classList.push('invalid');
    if (wrapperClassName) classList.push(wrapperClassName);
    return classList;
  }, [wrapperClassName, error]);

  const inputClassList = useMemo(() => {
    const classList = [
      'appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm',
    ];
    if (error) classList.push('border-pink-500 text-pink-600 focus:border-pink-500 focus:ring-pink-500');
    if (inputClassName) classList.push(inputClassName);
    return classList;
  }, [inputClassName, error]);

  return (
    <div className={wrapperClassList.join(' ')}>
      <label htmlFor={id}>{label}</label>
      <div className="mt-1 rounded-md shadow-sm">
        <input id={id} className={inputClassList.join(' ')} {...inputProps} />
      </div>

      {error && <div className="text-pink-500 font-medium text-sm">{error}</div>}
    </div>
  );
};

export default TextInput;
