import React from 'react';

export interface AlertProps {
  icon?: React.ReactNode;
  response: { eventId: number; message: string } | null;
  title: string;
  color?: string;
}

const Alert: React.FunctionComponent<AlertProps> = ({
  icon,
  response,
  color,
  title,
}) => {
  const alertColor =
    color ||
    (response?.eventId && getColorFromCode(response.eventId)) ||
    'pink';
  const boxClass = `bg-${alertColor}-500/20 border-${alertColor}-500 border-solid rounded-md flex items-stretch my-2 p-2 border`;
  const textColor = `text-${alertColor}-500`;
  return (
    <>
      {response?.eventId && (
        <div className={boxClass}>
          {icon && <div className="">{icon}</div>}
          <div className="grow">
            <strong className={textColor}>{title}</strong>
            <p>{response?.message}</p>
          </div>
        </div>
      )}
    </>
  );
};

const getColorFromCode = (code: number): string => {
  if (code >= 200 && code < 300) return 'green';
  if (code >= 400 && code < 600) return 'pink';
  return 'blue';
};

export default Alert;
