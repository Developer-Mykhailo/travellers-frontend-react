import { useSelector } from 'react-redux';
import TravellersStoriesItem from '../TravellersStoriesItem/TravellersStoriesItem';

import css from './TravellersStories.module.css';
import { selectUserPublicStoriesItems } from '../../../user/store/selectors';

const TravellersStories = ({ stories = [], storiesRef }) => {
  const userPublicStoriesItems = useSelector(selectUserPublicStoriesItems);
  const changedStory = userPublicStoriesItems?.find((elem) => elem.isChanged);

  // JSX
  return (
    <div>
      <ul className={css.list} ref={storiesRef}>
        {stories.map((story) => {
          if (story?._id === changedStory?._id) {
            return (
              <li className={css.item} key={story._id}>
                <TravellersStoriesItem story={changedStory} />
              </li>
            );
          } else {
            return (
              <li className={css.item} key={story._id}>
                <TravellersStoriesItem story={story} />
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
};

export default TravellersStories;
