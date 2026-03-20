import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import LogoEn from '../../assets/icons/LogoEn.svg?react';

import css from './Logo.module.css';

const mainLink = ({ isActive }) => {
  return clsx(isActive && css.active);
};

const Logo = () => {
  return (
    <NavLink to={'/'} className={mainLink}>
      <LogoEn className={css.logo} />
    </NavLink>
  );
};

export default Logo;
