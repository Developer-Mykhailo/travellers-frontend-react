import clsx from 'clsx';
import { Link, useLocation } from 'react-router-dom';

import ui from '../UI/ui.module.css';
import css from './PublishStoryLink.module.css';

const PublishStoryLink = ({ onClose, place }) => {
  const location = useLocation();
  const createStroyPage = location.pathname === '/stories/create';
  const isHome = location.pathname === '/';

  return (
    <Link
      className={
        isHome && place !== 'mobile'
          ? clsx(ui.shared, ui.accent)
          : clsx(ui.shared, ui.primary, createStroyPage && css.disabledLink)
      }
      to={'/stories/create'}
      onClick={onClose}
    >
      Publish Story
    </Link>
  );
};

export default PublishStoryLink;
