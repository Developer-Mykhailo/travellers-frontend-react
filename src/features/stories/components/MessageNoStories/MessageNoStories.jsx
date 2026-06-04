import { Link } from 'react-router-dom';

import ui from '../../../../components/UI/ui.module.css';
import css from './MessageNoStories.module.css';
import clsx from 'clsx';

const MessageNoStories = ({ link, message, linkText, messageClassName }) => {
  return (
    <div className={css.wrap}>
      <p className={clsx(css.message, messageClassName)}>{message}</p>

      <Link className={clsx(ui.shared, ui.primary)} to={link}>
        {linkText}
      </Link>
    </div>
  );
};

export default MessageNoStories;
