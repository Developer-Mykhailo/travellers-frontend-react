import { Link, useLocation } from 'react-router-dom';
import css from './Navigation.module.css';

import ui from '../UI/ui.module.css';
import clsx from 'clsx';

const Navigation = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isloggedIn = true;

  return (
    <ul className={css.list}>
      <li>
        <Link className={isHome ? css.home : css.link} to={'/'}>
          Main
        </Link>
      </li>
      <li>
        <Link className={isHome ? css.home : css.link} to={'/stories'}>
          Stories
        </Link>
      </li>
      <li>
        <Link className={isHome ? css.home : css.link} to={'/travellers'}>
          Travellers
        </Link>
      </li>

      {isloggedIn && (
        <>
          <li>
            <Link className={isHome ? css.home : css.link} to={'/profile'}>
              Profile
            </Link>
          </li>
          <li>
            <Link
              className={
                isHome
                  ? clsx(css.pad, ui.shared, ui.accent)
                  : clsx(css.pad, ui.shared, ui.primary)
              }
              to={'/publish-story'}
            >
              Publish Story
            </Link>
          </li>
        </>
      )}
    </ul>
  );
};

export default Navigation;
