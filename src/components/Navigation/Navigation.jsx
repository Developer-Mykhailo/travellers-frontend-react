import clsx from 'clsx';
import { Link, useLocation } from 'react-router-dom';

import ui from '../UI/ui.module.css';
import css from './Navigation.module.css';

const Navigation = ({ place, locaLinklClass }) => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isloggedIn = true;

  const buidLinkClass = () => {
    return clsx(css.link, locaLinklClass);
  };

  // JSX
  return (
    <ul className={css.list}>
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

      {isloggedIn && place !== 'footer' && (
        <>
          <li>
            <Link className={buidLinkClass()} to={'/profile'}>
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
