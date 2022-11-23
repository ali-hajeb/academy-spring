import React from 'react';
import { NavLink } from 'react-router-dom';

export interface NavbarItemProps {
  id: string;
  title: string;
  to: string;
  className?: string;
}

const NavbarItem: React.FunctionComponent<NavbarItemProps> = ({
  title,
  to,
  className,
}) => {
  return (
    <NavLink to={to} className={className}>
      {title}
    </NavLink>
  );
};

export default NavbarItem;
