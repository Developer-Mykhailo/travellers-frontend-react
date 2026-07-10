import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { PER_PAGE } from '../../../../constants/pagination';
import { fetchUserPublicStoriesByIds } from '../../../user/store/operation';
import {
  selectUser,
  selectUserPublicStoriesItems,
} from '../../../user/store/selectors';
import TravellersStories from '../TravellersStories/TravellersStories';

import css from '../SavedStories/SavedStories.module.css';
import Button from '../../../../components/UI/Button/Button';

const PublishedStories = () => {
  const dispatch = useDispatch();
  const { publicStories } = useSelector(selectUser);
  const userPublicStories = useSelector(selectUserPublicStoriesItems);

  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1439 });

  const totalStoriesIds = publicStories ?? [];

  const [page, setPage] = useState(1);
  const [visibleCount, setVisibleCount] = useState(isTablet ? 4 : 3);
  const [partToFetch, setPartToFetch] = useState({
    start: 0,
    end: PER_PAGE,
  });

  const storiesIds =
    publicStories?.slice(partToFetch.start, partToFetch.end) ?? [];

  const visibleStories = userPublicStories?.slice(0, visibleCount);

  //! fetch published stories
  /** first loading */
  useEffect(() => {
    if (!publicStories?.length) return;
    if (userPublicStories.length > 0) return;

    dispatch(fetchUserPublicStoriesByIds({ page, storiesIds }));
    // eslint-disable-next-line
  }, [dispatch, page, publicStories]);

  /** next loading */
  useEffect(() => {
    if (page === 1) return;

    dispatch(fetchUserPublicStoriesByIds({ page, storiesIds }));
    // eslint-disable-next-line
  }, [dispatch, page]);

  // breakpoint change
  useEffect(() => {
    // eslint-disable-next-line
    setVisibleCount(isTablet ? 4 : 3);
  }, [isTablet]);

  //todo handlers
  const handleShowMore = () => {
    const increment = isTablet ? 4 : 3;
    const nextVisibleCount = visibleCount + increment;

    if (userPublicStories.length >= nextVisibleCount) {
      setVisibleCount(nextVisibleCount);
      return;
    }

    setVisibleCount(nextVisibleCount);

    setPartToFetch({ start: partToFetch.end, end: partToFetch.end + 4 });
    setPage((prev) => prev + 1);
  };

  // JSX
  return (
    <div>
      <TravellersStories stories={visibleStories} />

      {visibleStories.length < totalStoriesIds.length && (
        <Button onClick={handleShowMore} className={css.viewMoreBtn}>
          View more
        </Button>
      )}
    </div>
  );
};

export default PublishedStories;
