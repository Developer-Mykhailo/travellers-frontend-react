import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../../features/auth/store/selectors';
import Navigation from '../../Navigation/Navigation';

import css from './MobileMenu.module.css';
import UserBar from '../../../features/auth/components/UserBar/UserBar';
import clsx from 'clsx';

const MobileMenu = ({ onClose, isOpen }) => {
  const mobileRoot = document.getElementById('mobile-modal-root');

  const isAuth = useSelector(selectIsAuth);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return createPortal(
    <div className={clsx(css.overlay, isOpen && css.open)}>
      <div className={css.modal}>
        <Navigation
          classList={css.mobileNavigation}
          place="mobile"
          onClose={onClose}
        />

        {isAuth && <UserBar place="mobile" />}
      </div>
    </div>,
    mobileRoot
  );
};

export default MobileMenu;
