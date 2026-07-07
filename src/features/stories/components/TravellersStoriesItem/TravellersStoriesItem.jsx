import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import avatarPLaceholder from '../../../../assets/icons/avatar.svg';
import Bookmark from '../../../../assets/icons/bookmark.svg?react';
import BookmarkSaved from '../../../../assets/icons/bookmarkSaved.svg?react';
import Edit from '../../../../assets/icons/edit.svg?react';
import placeholder from '../../../../assets/images/placeholder.jpg';
import Button from '../../../../components/UI/Button/Button';
import { useToggleSaveStory } from '../../../../hooks/useToggleSaveStory';
import { selectUser } from '../../../user/store/selectors';
import { selectIsAuth } from '../../../auth/store/selectors';

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

  const user = useSelector(selectUser);
  const location = useLocation();
  const toggleSaveStory = useToggleSaveStory();
  const isAuth = useSelector(selectIsAuth);

  const isMyStories = location.pathname === '/profile/published-stories';

  const saved = user.savedStories?.includes(_id);

  //todo handlers
  const handleStoryStatus = async () => {
    try {
      await toggleSaveStory(_id);
    } catch (error) {
      console.log(error);
    }
  };

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
            <img src={avatar ?? avatarPLaceholder} alt="avatar" />
          </div>

          <div className={css.userContent}>
            <p className={css.userName}>{name ?? user?.name}</p>

            <div className={css.userInfo}>
              <span>{date}</span>
              <span> • </span>
              <span>{favoriteCount}</span>
              {saved ? <BookmarkSaved /> : <Bookmark />}
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

          {isMyStories ? (
            <Link
              to={`/stories/${_id}/edit`}
              className={clsx(ui.shared, ui.secondary)}
            >
              <Edit />
            </Link>
          ) : (
            <Button
              className={saved && css.isSaved}
              variant="secondary"
              onClick={() =>
                isAuth ? handleStoryStatus() : alert('You are not logged in')
              }
            >
              <Bookmark />
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default TravellersStoriesItem;
