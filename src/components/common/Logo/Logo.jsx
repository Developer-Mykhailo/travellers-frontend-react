import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import LogoEn from '../../../assets/icons/LogoEn.svg?react';

import css from './Logo.module.css';

const Logo = ({ place, localClass }) => {
  const mainLink = ({ isActive }) => {
    return clsx(place === 'header' && isActive ? css.active : localClass);
  };

  // JSX
  return (
    <NavLink to="/" className={mainLink}>
      <LogoEn className={css.logo} />
    </NavLink>
  );
};

export default Logo;
