import clsx from 'clsx';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import placeholderAvatar from '../../../../assets/icons/avatar.svg';
import Logout from '../../../../assets/icons/logout.svg?react';
import Button from '../../../../components/UI/Button/Button';
import { fetchUser } from '../../../user/store/operation';
import { selectUser } from '../../../user/store/selectors';

import css from './UserBar.module.css';

const UserBar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isHome = location.pathname === '/';

  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  // JSX
  return (
    <div className={css.userBar}>
      <div className={css.wrapAvatar}>
        {user?.avatar ? (
          <img src={user.avatar} alt="User avatar" />
        ) : (
          <img src={placeholderAvatar} alt="avatar" />
        )}
      </div>

      <p className={clsx(css.userName, isHome && css.nameAccent)}>
        {user?.name && user.name.trim().split(' ')[0]}
      </p>

      <Button
        variant={isHome ? 'accent' : 'secondary'}
        className={isHome ? css.logout : css.logoutAccent}
      >
        <Logout />
      </Button>
    </div>
  );
};

export default UserBar;
