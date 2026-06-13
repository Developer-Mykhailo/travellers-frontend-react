import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserPublicStoriesByIds } from '../../../user/store/operation';
import {
  selectUser,
  selectUserPublicStories,
} from '../../../user/store/selectors';
import TravellersStories from '../TravellersStories/TravellersStories';

const PublishedStories = () => {
  const dispatch = useDispatch();
  const { publicStories } = useSelector(selectUser);
  const userPublicStories = useSelector(selectUserPublicStories);

  // user public stories
  useEffect(() => {
    const publicIds = publicStories;

    if (!publicIds?.length) return;

    try {
      dispatch(fetchUserPublicStoriesByIds({ page: 1, publicIds }));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, publicStories]);

  // JSX
  return (
    <div>
      <TravellersStories stories={userPublicStories} />
    </div>
  );
};

export default PublishedStories;
