import { data } from '../../../../../temp/stories.json';
import Bookmark from '../../../../assets/icons/bookmark.svg?react';
import placeHolder from '../../../../assets/images/placeHolder.jpg';
import Button from '../../../../components/UI/Button/Button';

import css from './TravellersStoriesItem.module.css';

const TravellersStoriesItem = () => {
  const stories = data.data;

  return (
    <>
      <h1 className={css.title}>Popular stories</h1>

      <ul className={css.list}>
        {stories.map(
          ({
            _id,
            img,
            title,
            category,
            article,
            owner: { name, avatar },
            date,
            favoriteCount,
          }) => (
            <li className={css.item} key={_id}>
              <div className={css.wrapImg}>
                <img src={img ?? placeHolder} alt={title} />
              </div>

              <div className={css.content}>
                <span className={css.category}>{category}</span>
                <h2 className={css.storyTitle}>{title}</h2>
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
                  <Button variant="secondary">View the article</Button>
                  <Button variant="secondary">
                    <Bookmark />
                  </Button>
                </div>
              </div>
            </li>
          )
        )}
      </ul>
    </>
  );
};

export default TravellersStoriesItem;
