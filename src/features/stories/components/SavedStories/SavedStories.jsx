import TravellersStories from '../TravellersStories/TravellersStories';
import responce from '../../../../../temp/stories.json';
// import { useSelector } from 'react-redux';
// import { selectUser } from '../../../user/store/selectors';

const SavedStories = () => {
  const stories = responce.data.data;

  // const user = useSelector(selectUser);

  // JSX
  return (
    <div>
      <TravellersStories stories={stories} />
    </div>
  );
};

export default SavedStories;
