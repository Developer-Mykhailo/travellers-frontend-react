import clsx from 'clsx';
import { useLocation } from 'react-router-dom';
import placeholderAvatar from '../../../../assets/icons/avatar.svg';
import Logout from '../../../../assets/icons/logout.svg?react';
import Button from '../../../../components/UI/Button/Button';

import css from './UserBar.module.css';

const user = {
  _id: '695858b59fc216ae51149192',
  name: 'Mykhailo Pylypiv',
  description: 'Hello everyone, I am happy to share my stories.',
  publicStories: [],
  avatar:
    'https://res.cloudinary.com/dtou0cw9o/image/upload/v1767405391/travellers-backend/avatars/1767405390965_195615627_omxzyf.jpg',
};

const UserBar = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

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
