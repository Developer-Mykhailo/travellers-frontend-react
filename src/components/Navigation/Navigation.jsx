import { Link, useLocation } from 'react-router-dom';
import css from './Navigation.module.css';

const Navigation = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

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
    </ul>
  );
};

export default Navigation;
