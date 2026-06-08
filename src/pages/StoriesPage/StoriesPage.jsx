import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import ArrowDown from '../../assets/icons/keyboard_arrow_down.svg?react';
import Container from '../../components/common/Container/Container';
import Section from '../../components/Section/Section';
import Button from '../../components/UI/Button/Button';
import TravellersStories from '../../features/stories/components/TravellersStories/TravellersStories';
import {
  fetchCategoriesApi,
  // fetchPublicStoriesApi,
} from '../../features/stories/store/operation';
import {
  selectCategories,
  selectPublicStories,
} from '../../features/stories/store/selectors';
import {
  appendPublicStories,
  setCategories,
  setPublicStories,
} from '../../features/stories/store/slice';

import css from './StoriesPage.module.css';

const StoriesPage = () => {
  const dispatch = useDispatch();
  const { items: stories, hasNextPage } = useSelector(selectPublicStories); //state

  const categories = useSelector(selectCategories);
  const allCategories = useMemo(
    () => [{ _id: 'all', name: 'All Stories' }, ...categories],
    [categories]
  );

  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1439 });

  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);

  //! effects

  //fetch stories
  useEffect(() => {
    fetchPublicStories();

    async function fetchPublicStories() {
      try {
        const currentPerPage =
          page === 1 ? (isTablet ? 8 : 9) : isTablet ? 4 : 3;

        const category =
          selectedCategory === 'All Stories' ? null : selectedCategory;

        const response = await fetchPublicStoriesApi(
          page,
          currentPerPage,
          category
        );

        page === 1
          ? dispatch(setPublicStories(response))
          : dispatch(appendPublicStories(response));
      } catch (error) {
        console.log(error);
      }
    }

    // eslint-disable-next-line
  }, [page, selectedCategory, dispatch]);

  // fetch categories
  useEffect(() => {
    fetchCategories();

    async function fetchCategories() {
      const response = await fetchCategoriesApi();

      dispatch(setCategories(response));
    }
  }, [dispatch]);

  //todo handlers
  const handleShowMore = () => {
    if (page === 1 && isTablet) {
      setPage(3);
      return;
    }

    if (page === 1 && !isTablet) {
      setPage(4);
      return;
    }

    setPage((prev) => prev + 1);
  };

  const handleChangeCategory = (category) => {
    setPage(1);
    setSelectedCategory(category);
  };

  // JSX
  return (
    <>
      <Section className={css.storiesSection}>
        <Container className={css.storiesContainer}>
          <h1 className={css.storiesTitle}>Travellers Stories</h1>

          {/* Categories — list/select  */}
          <>
            {isTablet ? (
              <ul className={css.categoryList}>
                {allCategories.map((cat) => (
                  <li key={cat._id}>
                    <button onClick={() => handleChangeCategory(cat.name)}>
                      {cat.name}
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <>
                <label className={css.cstegoryLabel} htmlFor="category">
                  Category
                </label>
                <div className={css.wrapSelect}>
                  <select
                    name="category"
                    id="category"
                    onChange={(e) => handleChangeCategory(e.target.value)}
                  >
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
          </>

          <TravellersStories stories={stories} />

          {hasNextPage && (
            <Button className={css.showMoreBtn} onClick={handleShowMore}>
              Show more
            </Button>
          )}
        </Container>
      </Section>
    </>
  );
};

export default StoriesPage;
