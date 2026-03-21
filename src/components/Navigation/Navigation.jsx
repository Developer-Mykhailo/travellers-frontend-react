import clsx from 'clsx';
import { Link, useLocation } from 'react-router-dom';

import { useMediaQuery } from 'react-responsive';
import ui from '../UI/ui.module.css';
import css from './Navigation.module.css';

const Navigation = ({ place, classList }) => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isDesktop = useMediaQuery({ query: '(min-width: 1440px)' });
  const isloggedIn = true;
  // const isloggedIn = false;

  // JSX
  return (
    <ul className={clsx(css.list, classList)}>
      {((place === 'header' && isDesktop) || place === 'footer') && (
        <>
          <li>
            <Link to={'/'}>Main</Link>
          </li>
          <li>
            <Link to={'/stories'}>Stories</Link>
          </li>
          <li>
            <Link to={'/travellers'}>Travellers</Link>
          </li>
        </>
      )}

      {isloggedIn && place === 'header' && (
        <>
          {isDesktop && (
            <li>
              <Link to={'/profile'}>Profile</Link>
            </li>
          )}

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
