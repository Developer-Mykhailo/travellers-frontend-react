import TravellersStories from '../TravellersStories/TravellersStories';
import responce from '../../../../../temp/stories.json';

const PublishedStories = () => {
  const stories = responce.data.data;

  // JSX
  return (
    <div>
      <TravellersStories stories={stories} />
    </div>
  );
};

export default PublishedStories;
