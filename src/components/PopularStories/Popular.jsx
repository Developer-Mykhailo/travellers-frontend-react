import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import TravellersStories from '../../features/stories/components/TravellersStories/TravellersStories';
import { fetchPublicStories } from '../../features/stories/store/operation';
import {
  selectCurrentCategory,
  selectIsFetched,
  selectPublicStories,
  selectStorePage,
} from '../../features/stories/store/selectors';
import Container from '../common/Container/Container';
import Section from '../Section/Section';
import Button from '../UI/Button/Button';

import { PER_PAGE } from '../../constants/pagination';

import css from './Popular.module.css';
import {
  deleteCategory,
  setStorePage,
} from '../../features/stories/store/slice';

const Popular = () => {
  const dispatch = useDispatch();
  const { items, hasNextPage, totalItems } = useSelector(selectPublicStories);
  const selectedCategory = useSelector(selectCurrentCategory);
  const storePage = useSelector(selectStorePage);
  const isFetched = useSelector(selectIsFetched);

  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1439 });
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const [visibleCount, setVisibleCount] = useState(isTablet ? 4 : 3);

  const visibleStories = items?.slice(0, visibleCount);

  // ! effects
  /** first loading */
  useEffect(() => {
    if (isFetched && selectedCategory === null) return; // Cached stories already contain the unfiltered list.

    dispatch(deleteCategory());
    dispatch(setStorePage(1));

    dispatch(fetchPublicStories({ page: 1, perPage: PER_PAGE }));
  }, [dispatch, selectedCategory, isFetched]);

  // breakpoint
  useEffect(() => {
    // eslint-disable-next-line
    setVisibleCount(isTablet ? 4 : 3);
  }, [isTablet]);

  //todo handlers
  const handleShowMore = async () => {
    const increment = isTablet ? 4 : 3;
    const nextVisibleCount = visibleCount + increment;

    // enough stories in store
    if (items.length >= nextVisibleCount) {
      setVisibleCount(nextVisibleCount);
      return;
    }

    // backend has no more pages
    if (!hasNextPage) {
      setVisibleCount(nextVisibleCount);
      return;
    }

    const nextPage = storePage + 1;

    await dispatch(fetchPublicStories({ page: nextPage, perPage: PER_PAGE }));
  };

  // JSX
  return (
    <Section className={css.popularSection}>
      <Container>
        <h2 className={css.title}>Popular stories</h2>

        <TravellersStories stories={visibleStories} />

        {!isMobile && visibleStories.length < totalItems && (
          <Button onClick={handleShowMore} className={css.viewMoreBtn}>
            View more
          </Button>
        )}
      </Container>
    </Section>
  );
};

export default Popular;
