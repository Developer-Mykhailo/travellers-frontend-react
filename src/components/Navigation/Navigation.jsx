import { Link, useLocation } from 'react-router-dom';
import css from './Navigation.module.css';

import ui from '../UI/ui.module.css';
import clsx from 'clsx';

const Navigation = ({ footer }) => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isloggedIn = true;

  const buidLinkClass = () => {
    return clsx(css.link, isHome && !footer && css.home);
  };

  return (
    <ul className={clsx(css.list)}>
      <li>
        <Link className={buidLinkClass()} to={'/'}>
          Main
        </Link>
      </li>
      <li>
        <Link className={buidLinkClass()} to={'/stories'}>
          Stories
        </Link>
      </li>
      <li>
        <Link className={buidLinkClass()} to={'/travellers'}>
          Travellers
        </Link>
      </li>

      {isloggedIn && !footer && (
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
