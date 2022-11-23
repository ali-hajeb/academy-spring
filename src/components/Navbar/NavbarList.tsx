import React from 'react';
import NavbarItem from './NavbarItem';
import { INavItem } from './types';

export interface NavbarListProps {
  items: INavItem[];
  itemClassName?: string;
}

const NavbarList: React.FunctionComponent<NavbarListProps> = ({
  items,
  itemClassName,
}) => {
  return (
    <>
      {items.map((item) => (
        <NavbarItem
          key={item.id}
          id={item.id}
          title={item.title}
          to={item.to}
          className={item.className || itemClassName || ''}
        />
      ))}
    </>
  );
};

export default NavbarList;
