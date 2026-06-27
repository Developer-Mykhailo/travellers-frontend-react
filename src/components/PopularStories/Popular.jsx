import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import TravellersStories from '../../features/stories/components/TravellersStories/TravellersStories';
import { fetchPublicStories } from '../../features/stories/store/operation';
import {
  selectCurrentCategory,
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
  const { items, hasNextPage, totalItems } = useSelector(selectPublicStories); //state
  const selectedCategory = useSelector(selectCurrentCategory); //state
  const storePage = useSelector(selectStorePage); //state

  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1439 });
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const [visibleCount, setVisibleCount] = useState(isTablet ? 4 : 3);

  const visibleStories = items?.slice(0, visibleCount);

  // ! effects
  /** first loading */
  useEffect(() => {
    if (items.length > 0 && selectedCategory === null) return;
    dispatch(deleteCategory());

    const queryParams = { page: 1, perPage: PER_PAGE };

    dispatch(setStorePage(1));

    dispatch(fetchPublicStories(queryParams));
  }, [dispatch, items.length, selectedCategory, storePage]);

  /** next loading */
  useEffect(() => {
    const hasTobePage = Math.ceil(items.length / PER_PAGE);

    if (storePage === 1 || hasTobePage >= storePage) return;

    dispatch(fetchPublicStories({ page: storePage, perPage: PER_PAGE }));
  }, [dispatch, storePage]);

  //todo handlers
  const handleShowMore = () => {
    const increment = isTablet ? 4 : 3;
    const nextVisibleCount = visibleCount + increment;

    if (items.length >= nextVisibleCount) {
      setVisibleCount(nextVisibleCount);
      return;
    }

    setVisibleCount(nextVisibleCount);

    hasNextPage && dispatch(setStorePage(storePage + 1));
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
