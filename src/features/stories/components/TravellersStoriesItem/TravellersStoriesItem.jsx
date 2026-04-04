import clsx from 'clsx';
import { Link } from 'react-router-dom';
import Bookmark from '../../../../assets/icons/bookmark.svg?react';
import placeholder from '../../../../assets/images/placeholder.jpg';
import Button from '../../../../components/UI/Button/Button';

import ui from '../../../../components/UI/ui.module.css';
import css from './TravellersStoriesItem.module.css';

const TravellersStoriesItem = ({ story }) => {
  const {
    _id,
    img,
    title,
    category,
    article,
    owner: { name, avatar },
    date,
    favoriteCount,
  } = story;

  // JSX
  return (
    <>
      <div className={css.wrapImg}>
        <img src={img ?? placeholder} alt={title} />
      </div>

      <div className={css.content}>
        <span className={css.category}>{category}</span>
        <h3 className={css.storyTitle}>{title}</h3>
        <p className={css.storyDescr}>{article}</p>

        <div className={css.userInfoWrap}>
          <div className={css.avatarWrap}>
            <img src={avatar} alt="avatar" />
          </div>

          <div className={css.userContent}>
            <p className={css.userName}>{name}</p>

            <div className={css.userInfo}>
              <span>{date}</span>
              <span> • </span>
              <span>{favoriteCount}</span>
              <Bookmark className={css.bookmark} />
            </div>
          </div>
        </div>

        <div className={css.wrapperButtons}>
          <Link
            to={`/stories/${_id}`}
            className={clsx(ui.shared, ui.secondary)}
          >
            View the article
          </Link>
          <Button variant="secondary">
            <Bookmark />
          </Button>
        </div>
      </div>
    </>
  );
};

export default TravellersStoriesItem;
