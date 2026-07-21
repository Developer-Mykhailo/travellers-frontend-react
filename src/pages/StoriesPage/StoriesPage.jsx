import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import ArrowDown from '../../assets/icons/keyboard_arrow_down.svg?react';
import Container from '../../components/common/Container/Container';
import Section from '../../components/Section/Section';
import Button from '../../components/UI/Button/Button';
import { PER_PAGE } from '../../constants/pagination';
import TravellersStories from '../../features/stories/components/TravellersStories/TravellersStories';
import {
  fetchCategories,
  fetchPublicStories,
} from '../../features/stories/store/operation';
import {
  selectCategories,
  selectCurrentCategory,
  selectIsFetched,
  selectPublicStories,
  selectStorePage,
} from '../../features/stories/store/selectors';
import {
  clearStories,
  setCategory,
  setStorePage,
} from '../../features/stories/store/slice';

import css from './StoriesPage.module.css';

const StoriesPage = () => {
  const dispatch = useDispatch();

  const { items, hasNextPage, totalItems } = useSelector(selectPublicStories);
  const storePage = useSelector(selectStorePage);
  const selectedCategory = useSelector(selectCurrentCategory);
  const categories = useSelector(selectCategories);
  const isFetched = useSelector(selectIsFetched);

  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1439 });

  const [visibleCount, setVisibleCount] = useState(isTablet ? 8 : 9);

  const storiesRef = useRef(null);

  const allCategories = useMemo(
    () => [{ _id: 'all', name: 'All Stories' }, ...categories],
    [categories]
  );

  const visibleStories = items?.slice(0, visibleCount);

  // categories
  useEffect(() => {
    if (categories.length > 0) return;

    dispatch(fetchCategories());
  }, [dispatch, categories.length]);

  //! effects
  /** first loading + category change */
  useEffect(() => {
    if (isFetched) return;

    dispatch(setStorePage(1));

    dispatch(
      fetchPublicStories({
        page: 1,
        perPage: PER_PAGE,
        category: selectedCategory === 'All Stories' ? null : selectedCategory,
      })
    );
  }, [dispatch, selectedCategory, isFetched]);

  // breakpoint
  useEffect(() => {
    // eslint-disable-next-line
    setVisibleCount(isTablet ? 8 : 9);
  }, [isTablet]);

  //todo handles
  const handleShowMore = async () => {
    const increment = isTablet ? 8 : 9;

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

    await dispatch(
      fetchPublicStories({
        page: nextPage,
        perPage: PER_PAGE,
        category: selectedCategory === 'All Stories' ? null : selectedCategory,
      })
    );

    dispatch(setStorePage(storePage + 1));

    setVisibleCount(nextVisibleCount);
  };

  const handleChangeCategory = (category) => {
    dispatch(setCategory(category));
    dispatch(clearStories());
  };

  return (
    <Section className={css.storiesSection}>
      <Container className={css.storiesContainer}>
        <h1 className={css.storiesTitle}>Travellers Stories</h1>

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

        <TravellersStories stories={visibleStories} storiesRef={storiesRef} />

        {visibleStories.length < totalItems && (
          <Button className={css.showMoreBtn} onClick={handleShowMore}>
            Show more
          </Button>
        )}
      </Container>
    </Section>
  );
};

export default StoriesPage;
