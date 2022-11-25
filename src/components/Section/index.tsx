import React from 'react';

export interface SectionProps extends React.PropsWithChildren {
  title: string;
  className?: string;
}

const Section: React.FunctionComponent<SectionProps> = ({
  title,
  className,
  children,
}) => {
  return (
    <section className={className}>
      <h1 className="text-center font-bold text-3xl">{title}</h1>
      {children}
    </section>
  );
};

export default Section;
