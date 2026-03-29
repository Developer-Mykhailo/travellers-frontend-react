import { NavLink } from 'react-router-dom';

import css from './StoriesToggle.module.css';
import clsx from 'clsx';
const StoriesToggle = () => {
  // ---
  const navLinkStyles = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };

  // JSX
  return (
    <div className={css.wrapList}>
      <ul className={css.linksList}>
        <li>
          <NavLink className={navLinkStyles} to="saved-stories">
            Saved stories
          </NavLink>
        </li>
        <li>
          <NavLink className={navLinkStyles} to="published-stories">
            My stories
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default StoriesToggle;
