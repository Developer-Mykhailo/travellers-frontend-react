import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { selectIsAuth } from '../../features/auth/store/selectors';
import PublishStoryLink from '../PublishStoryLink/PublishStoryLink';
// import { useMediaQuery } from 'react-responsive';

import ui from '../UI/ui.module.css';
import css from './Navigation.module.css';

const Navigation = ({ place, classList, onClose }) => {
  const isAuth = useSelector(selectIsAuth);

  const location = useLocation();
  const isHome = location.pathname === '/';

  // JSX
  return (
    <ul className={clsx(css.list, classList)}>
      {/* //! shared links */}
      <>
        <li>
          <Link to={'/'} onClick={onClose}>
            Main
          </Link>
        </li>
        <li>
          <Link to={'/stories'} onClick={onClose}>
            Stories
          </Link>
        </li>
        <li>
          <Link to={'/travellers'} onClick={onClose}>
            Travellers
          </Link>
        </li>
      </>

      {/* //! Profile & Publish story links */}
      {isAuth && place !== 'footer' && (
        <>
          <li>
            <Link to={'/profile'} onClick={onClose}>
              Profile
            </Link>
          </li>

          <li>
            <PublishStoryLink place={place} onClose={onClose} />
          </li>
        </>
      )}

      {/* //! Login & Registr links */}
      {!isAuth && (place !== 'footer' || place === 'mobile') && (
        <>
          <li>
            <Link
              className={
                !isHome || place === 'mobile'
                  ? clsx(ui.shared, ui.secondary)
                  : clsx(ui.shared, ui.accent2)
              }
              to={'auth/login'}
              onClick={onClose}
            >
              Log In
            </Link>
          </li>

          <li>
            <Link
              className={
                isHome && place !== 'mobile'
                  ? clsx(ui.shared, ui.accent)
                  : clsx(ui.shared, ui.primary)
              }
              to={'auth/register'}
              onClick={onClose}
            >
              Register
            </Link>
          </li>
        </>
      )}
    </ul>
  );
};

export default Navigation;
