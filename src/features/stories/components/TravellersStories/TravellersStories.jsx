import TravellersStoriesItem from '../TravellersStoriesItem/TravellersStoriesItem';

import css from './TravellersStories.module.css';

const TravellersStories = ({ stories = [], storiesRef }) => {
  return (
    <div>
      <ul className={css.list} ref={storiesRef}>
        {stories.map((story) => (
          <li className={css.item} key={story._id}>
            <TravellersStoriesItem story={story} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TravellersStories;
