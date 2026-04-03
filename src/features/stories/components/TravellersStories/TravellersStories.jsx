import css from './TravellersStories.module.css';

import response from '../../../../../temp/stories.json';
import TravellersStoriesItem from '../TravellersStoriesItem/TravellersStoriesItem';

const TravellersStories = () => {
  const stories = response.data.data;

  return (
    <div>
      <ul className={css.list}>
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
