import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import Button from '../../../../components/UI/Button/Button';
import { PER_PAGE } from '../../../../constants/pagination';
import { fetchUserSavedStoriesByIds } from '../../../user/store/operation';
import {
  selectUser,
  selectUserSavedStories,
} from '../../../user/store/selectors';
import TravellersStories from '../TravellersStories/TravellersStories';

import css from './SavedStories.module.css';

const SavedStories = () => {
  const dispatch = useDispatch();
  const { savedStories } = useSelector(selectUser);
  const userSavedStories = useSelector(selectUserSavedStories);

  const totalStoriesIds = savedStories ?? [];

  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1439 });

  const [page, setPage] = useState(1);
  const [visibleCount, setVisibleCount] = useState(isTablet ? 4 : 3);
  const [partToFetch, setPartToFetch] = useState({
    start: 0,
    end: PER_PAGE,
  });

  const storiesIds =
    savedStories?.slice(partToFetch.start, partToFetch.end) ?? [];

  const visibleStories = userSavedStories.slice(0, visibleCount);

  //! fetch saved stories
  /** first loading */
  useEffect(() => {
    if (!savedStories?.length) return;
    if (userSavedStories.length > 0) return;

    dispatch(fetchUserSavedStoriesByIds({ page, storiesIds }));
    // eslint-disable-next-line
  }, [dispatch, page, savedStories]);

  /** next loading */
  useEffect(() => {
    if (page === 1) return;

    dispatch(fetchUserSavedStoriesByIds({ page, storiesIds }));
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

    if (userSavedStories.length >= nextVisibleCount) {
      setVisibleCount(nextVisibleCount);
      return;
    }

    setVisibleCount(nextVisibleCount);

    setPartToFetch({ start: partToFetch.end, end: partToFetch.end + PER_PAGE });
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

export default SavedStories;
