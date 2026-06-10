import clsx from 'clsx';
import { useMediaQuery } from 'react-responsive';
import { Link, useLocation } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../features/auth/store/selectors';

import ui from '../UI/ui.module.css';
import css from './Navigation.module.css';

const Navigation = ({ place, classList }) => {
  const isAuth = useSelector(selectIsAuth);

  const location = useLocation();
  const isHome = location.pathname === '/';
  const isDesktop = useMediaQuery({ minWidth: 1440 });

  // JSX
  return (
    <ul className={clsx(css.list, classList)}>
      {/* //! shared links */}
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

      {/* //! Login & Registr links */}

      {!isAuth && place !== 'footer' && (
        <>
          {isDesktop && (
            <li>
              <Link
                className={
                  isHome
                    ? clsx(ui.shared, ui.accent2)
                    : clsx(ui.shared, ui.secondary)
                }
                to={'/login'}
              >
                Log In
              </Link>
            </li>
          )}

          <li>
            <Link
              className={
                isHome
                  ? clsx(ui.shared, ui.accent)
                  : clsx(ui.shared, ui.primary)
              }
              to={'/register'}
            >
              Register
            </Link>
          </li>
        </>
      )}

      {/* //! Profile & Publish story links */}

      {isAuth && place !== 'footer' && (
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
                  ? clsx(ui.shared, ui.accent)
                  : clsx(ui.shared, ui.primary)
              }
              to={'/stories/create'}
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
