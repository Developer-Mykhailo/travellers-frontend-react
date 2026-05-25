import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import TravellersStories from '../../features/stories/components/TravellersStories/TravellersStories';
import { fetchStoriesApi } from '../../features/stories/store/operation';
import { selectPublicStories } from '../../features/stories/store/selectors';
import { setPublicStories } from '../../features/stories/store/slice';
import Container from '../common/Container/Container';
import Section from '../Section/Section';
import Button from '../UI/Button/Button';

import css from './Popular.module.css';

const Popular = () => {
  const dispatch = useDispatch();
  const isTablet = useMediaQuery({ minWidth: 768 });
  const stories = useSelector(selectPublicStories);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const data = await fetchStoriesApi();

        dispatch(setPublicStories(data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchStories();
  }, [dispatch]);

  // JSX
  return (
    <Section className={css.popularSection}>
      <Container>
        <h2 className={css.title}>Popular stories</h2>

        <TravellersStories stories={stories} />

        {isTablet && <Button className={css.viewMoreBtn}>View more</Button>}
      </Container>
    </Section>
  );
};

export default Popular;
