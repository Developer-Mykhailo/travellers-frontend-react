import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import LogoEn from '../../../assets/icons/LogoEn.svg?react';

import css from './Logo.module.css';

const Logo = ({ footer, className }) => {
  const mainLink = ({ isActive }) => {
    if (!footer) {
      return clsx(isActive && css.active);
    }
  };

  // JSX
  return (
    <NavLink to="/" className={clsx(mainLink, className)}>
      <LogoEn className={css.logo} />
    </NavLink>
  );
};

export default Logo;
