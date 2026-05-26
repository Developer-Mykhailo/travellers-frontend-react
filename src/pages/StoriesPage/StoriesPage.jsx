import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import storyCategories from '../../../temp/categories.json';
import ArrowDown from '../../assets/icons/keyboard_arrow_down.svg?react';
import Container from '../../components/common/Container/Container';
import Section from '../../components/Section/Section';
import Button from '../../components/UI/Button/Button';
import TravellersStories from '../../features/stories/components/TravellersStories/TravellersStories';
import { fetchPublicStoriesApi } from '../../features/stories/store/operation';
import { selectPublicStories } from '../../features/stories/store/selectors';
import {
  appendPublicStories,
  setPublicStories,
} from '../../features/stories/store/slice';

import css from './StoriesPage.module.css';

const StoriesPage = () => {
  const dispatch = useDispatch();
  const stories = useSelector(selectPublicStories);

  const categories = storyCategories.data; // temp
  const allCategories = [{ _id: 'all', name: 'All Stories' }, ...categories];

  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1439 });
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(false);

  const perPage = page === 1 ? (isTablet ? 8 : 9) : 3;

  //! effects
  useEffect(() => {
    fetchPublicStories();

    async function fetchPublicStories() {
      try {
        const { data, hasNextPage } = await fetchPublicStoriesApi(
          page,
          perPage
        );

        page === 1
          ? dispatch(setPublicStories(data))
          : dispatch(appendPublicStories(data));

        setNextPage(hasNextPage);
      } catch (error) {
        console.log(error);
      }
    }
  }, [dispatch, page, perPage]);

  //todo handlers
  const handleClick = () => {
    setPage((prev) => prev + 1);
  };

  // JSX
  return (
    <>
      <Section className={css.storiesSection}>
        <Container className={css.storiesContainer}>
          <h1 className={css.storiesTitle}>Travellers Stories</h1>

          {isTablet ? (
            <ul className={css.categoryList}>
              {allCategories.map((cat) => (
                <li key={cat._id}>
                  <button>{cat.name}</button>
                </li>
              ))}
            </ul>
          ) : (
            <>
              <label className={css.cstegoryLabel} htmlFor="category">
                Category
              </label>
              <div className={css.wrapSelect}>
                <select name="category" id="category">
                  {allCategories.map((cat) => (
                    <option key={cat._id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <ArrowDown className={css.arrowDown} />
              </div>
            </>
          )}

          <TravellersStories stories={stories} />

          {!isMobile && nextPage && (
            <Button className={css.showMoreBtn} onClick={handleClick}>
              Show more
            </Button>
          )}
        </Container>
      </Section>
    </>
  );
};

export default StoriesPage;
