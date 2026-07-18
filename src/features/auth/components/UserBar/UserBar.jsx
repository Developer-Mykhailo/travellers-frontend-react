import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import placeholderAvatar from '../../../../assets/icons/avatar.svg';
import Logout from '../../../../assets/icons/logout.svg?react';
import Button from '../../../../components/UI/Button/Button';
import ConfirmModal from '../../../../components/UI/ConfirmModal/ConfirmModal';
import { useModalState } from '../../../../hooks/useModalState';
import { selectUser } from '../../../user/store/selectors';
import { logoutUser } from '../../store/operation';

import css from './UserBar.module.css';

/**
 * UserBar component.
 * Renders the current user's avatar, first name and a logout button.
 * The logout action shows a confirmation modal before dispatching.
 *
 * @returns {JSX.Element}
 */
const UserBar = ({ place }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const { isOpen: isModalOpen, openModal, closeModal } = useModalState();

  const { avatar, name } = useSelector(selectUser) ?? {};

  const firstName = name?.trim().split(' ')[0] ?? '';

  const avatarSrc = avatar || placeholderAvatar;

  const isMobileMenu = place === 'mobile';

  // Handlers
  /**
   * Dispatch logout operation and ensure modal is closed afterwards.
   * @returns {Promise<void>}
   */
  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());
    } finally {
      closeModal();
    }
  };

  // JSX
  return (
    <div className={clsx(css.userBar, place === 'mobile' && css.mobile)}>
      <div className={css.wrapAvatar}>
        <img src={avatarSrc} alt="User avatar" />
      </div>

      <p
        className={clsx(
          !isHome || isMobileMenu ? css.userName : css.nameAccent
        )}
      >
        {firstName}
      </p>

      <Button
        variant={!isHome || isMobileMenu ? 'secondary' : 'accent'}
        className={!isHome || isMobileMenu ? css.logoutAccent : css.logout}
        onClick={openModal}
      >
        <Logout />
      </Button>

      {isModalOpen && (
        <ConfirmModal
          onClose={closeModal}
          title="Are you sure you want to exit?"
          descr="We will miss you!"
          confirmButtonText="Log out"
          cancelButtonText="Cancel"
          onConfirm={handleLogout}
          onCancel={() => closeModal()}
        />
      )}
    </div>
  );
};

export default UserBar;
