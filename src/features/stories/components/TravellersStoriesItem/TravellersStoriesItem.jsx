import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import avatarPLaceholder from '../../../../assets/icons/avatar.svg';
import Bookmark from '../../../../assets/icons/bookmark.svg?react';
import BookmarkSaved from '../../../../assets/icons/bookmarkSaved.svg?react';
import Edit from '../../../../assets/icons/edit.svg?react';
import placeholder from '../../../../assets/images/placeholder.jpg';
import Button from '../../../../components/UI/Button/Button';
import { selectIsAuth } from '../../../auth/store/selectors';
import { toggleSaveStory } from '../../../user/store/operation';
import {
  selectUser,
  selectUserSavedStoriesItems,
} from '../../../user/store/selectors';
import {
  changeSavedStories,
  changeSavedStoriesItems,
} from '../../../user/store/slice';
import { fetchPublicStoryById } from '../../store/operation';

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

  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const user = useSelector(selectUser);
  const userSavedStoriesItems = useSelector(selectUserSavedStoriesItems);

  const location = useLocation();

  const isMyStories = location.pathname === '/profile/published-stories';

  const saved = user.savedStories?.includes(_id);

  //todo handlers
  const handleToggleSaveStory = async () => {
    if (!isAuth) return;

    try {
      const response = await dispatch(toggleSaveStory(_id)).unwrap();

      const isSaved = response.data.saved;

      if (isSaved) {
        // add story
        const story = await dispatch(fetchPublicStoryById(_id)).unwrap();

        dispatch(changeSavedStories([...user.savedStories, _id]));

        dispatch(changeSavedStoriesItems([...userSavedStoriesItems, story]));
      } else {
        // remove
        dispatch(
          changeSavedStories(user.savedStories.filter((id) => id !== _id))
        );

        dispatch(
          changeSavedStoriesItems(
            userSavedStoriesItems.filter((story) => story._id !== _id)
          )
        );
      }
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
            <img
              src={avatar ?? (user?.avatar || avatarPLaceholder)}
              alt="avatar"
            />
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
              onClick={handleToggleSaveStory}
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
