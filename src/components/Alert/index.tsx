import React from 'react';

export interface AlertProps {
  icon?: React.ReactNode;
  response: { eventId: number; message: string } | null;
  title?: string;
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
  const bgColor = `bg-${alertColor}-500`;
  const textColor = `text-${alertColor}-500`;
  const borderColor = `border-${alertColor}-500`;
  return (
    <>
      {response?.eventId && (
        <div
          className={`${bgColor} flex items-stretch my-2 p-2 border ${borderColor} border-solid rounded-md`}
        >
          {icon && <div className="">{icon}</div>}
          <div className="grow">
            {title && <strong className={textColor}>{title}</strong>}
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
