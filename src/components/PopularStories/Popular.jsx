import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import TravellersStories from '../../features/stories/components/TravellersStories/TravellersStories';
import { fetchPublicStoriesApi } from '../../features/stories/store/operation';
import { selectPublicStories } from '../../features/stories/store/selectors';
import {
  appendPublicStories,
  setPublicStories,
} from '../../features/stories/store/slice';
import Container from '../common/Container/Container';
import Section from '../Section/Section';
import Button from '../UI/Button/Button';

import css from './Popular.module.css';

const Popular = () => {
  const dispatch = useDispatch();
  const stories = useSelector(selectPublicStories);

  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1439 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const perPage = !isTablet ? 3 : 4;

  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(false);

  // handlers
  const handleClick = () => {
    setPage((prev) => prev + 1);
  };

  // effects
  useEffect(() => {
    // fetch stories first time
    fetchPublicStories();

    async function fetchPublicStories() {
      try {
        const { data, hasNextPage } = await fetchPublicStoriesApi(
          page,
          perPage
        );

        stories.length > 0
          ? dispatch(appendPublicStories(data))
          : dispatch(setPublicStories(data));

        setNextPage(hasNextPage);
      } catch (error) {
        console.log(error);
      }
    }
    // eslint-disable-next-line
  }, [dispatch, page, perPage]);

  // JSX
  return (
    <Section className={css.popularSection}>
      <Container>
        <h2 className={css.title}>Popular stories</h2>

        <TravellersStories stories={stories} />

        {!isMobile && nextPage && (
          <Button onClick={handleClick} className={css.viewMoreBtn}>
            View more
          </Button>
        )}
      </Container>
    </Section>
  );
};

export default Popular;
