import React from 'react';

export interface CardContainerProps extends React.PropsWithChildren {
}

const CardContainer: React.FunctionComponent<CardContainerProps> = ({children}) => {
  return ( <article className='rounded-md bg-white shadow'>
    {children}
  </article> );
}

export default CardContainer;