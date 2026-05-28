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
  const { items: stories, hasNextPage } = useSelector(selectPublicStories); //state

  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1439 });
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const perPage = isTablet ? 4 : 3;

  const [page, setPage] = useState(1); //local state

  // ! effects
  useEffect(() => {
    fetchPublicStories();

    async function fetchPublicStories() {
      try {
        const response = await fetchPublicStoriesApi(page, perPage);

        page === 1
          ? dispatch(setPublicStories(response))
          : dispatch(appendPublicStories(response));
      } catch (error) {
        console.log(error);
      }
    }

    // eslint-disable-next-line
  }, [page]);

  //todo handlers
  const handleClick = () => {
    setPage((prev) => prev + 1);
  };

  // JSX
  return (
    <Section className={css.popularSection}>
      <Container>
        <h2 className={css.title}>Popular stories</h2>

        <TravellersStories stories={stories} />

        {!isMobile && hasNextPage && (
          <Button onClick={handleClick} className={css.viewMoreBtn}>
            View more
          </Button>
        )}
      </Container>
    </Section>
  );
};

export default Popular;
