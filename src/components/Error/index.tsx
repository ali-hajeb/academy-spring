import React from 'react';
import { FaceFrownIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

export interface ErrorBoxProps extends React.PropsWithChildren {
  withSadFace?: boolean;
  message?: string;
  retry?: () => void;
}

const ErrorBox: React.FunctionComponent<ErrorBoxProps> = ({
  withSadFace = false,
  message,
  retry,
  children,
}) => {
  return (
    <article className="flex items-center justify-center flex-col gap-1 w-full">
      {withSadFace && <FaceFrownIcon height={128} />}
      {message && (
        <span className="text-lg font-bold text-center">{message}</span>
      )}
      {retry && (
        <div>
          <button
            className="flex gap-2 rounded-lg px-4 py-1.5 text-base font-semibold leading-7 text-gray-900 ring-1 ring-gray-900/10 hover:ring-gray-900/20"
            onClick={retry}
          >
            <ArrowPathIcon height={24} />
            <div>تلاش دوباره</div>
          </button>
        </div>
      )}
      {children}
    </article>
  );
};

export default ErrorBox;
