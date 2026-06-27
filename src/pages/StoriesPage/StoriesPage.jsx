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
  selectPublicStories,
  selectStorePage,
} from '../../features/stories/store/selectors';

import css from './StoriesPage.module.css';
import { setCategory, setStorePage } from '../../features/stories/store/slice';

const StoriesPage = () => {
  const dispatch = useDispatch();

  const { items, hasNextPage, totalItems } = useSelector(selectPublicStories); //state
  const storePage = useSelector(selectStorePage); //state
  const selectedCategory = useSelector(selectCurrentCategory); //state

  const categories = useSelector(selectCategories);

  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1439 });

  const [visibleCount, setVisibleCount] = useState(isTablet ? 8 : 9);

  const allCategories = useMemo(
    () => [{ _id: 'all', name: 'All Stories' }, ...categories],
    [categories]
  );

  const visibleStories = items.slice(0, visibleCount);

  const storiesRef = useRef(null);

  //! effects
  //fetch stories  /** first loading */
  useEffect(() => {
    if (items.length > 0) return;

    dispatch(
      fetchPublicStories({
        page: 1,
        perPage: PER_PAGE,
        category: selectedCategory === 'All Stories' ? null : selectedCategory,
      })
    );
  }, [dispatch, selectedCategory, items.length, storePage]);

  //fetch stories  /** next loading */
  useEffect(() => {
    const hasTobePage = Math.ceil(items.length / PER_PAGE);

    if (
      (storePage === 1 || hasTobePage >= storePage) &&
      selectedCategory === null
    ) {
      return;
    }

    dispatch(
      fetchPublicStories({
        page: storePage,
        perPage: PER_PAGE,
        category: selectedCategory === 'All Stories' ? null : selectedCategory,
      })
    );
  }, [dispatch, selectedCategory, storePage]);

  // fetch categories
  useEffect(() => {
    if (categories.length > 0) return;
    dispatch(fetchCategories());
  }, [dispatch, categories.length]);

  // breakpoint change
  useEffect(() => {
    // eslint-disable-next-line
    setVisibleCount(isTablet ? 8 : 9);
  }, [isTablet]);

  //todo handlers
  const handleShowMore = () => {
    const increment = isTablet ? 8 : 9;
    const nextVisibleCount = visibleCount + increment;

    if (items.length > nextVisibleCount) {
      setVisibleCount(nextVisibleCount);
      return;
    }

    setVisibleCount(nextVisibleCount);

    hasNextPage && dispatch(setStorePage(storePage + 1));
  };

  //
  const handleChangeCategory = (category) => {
    dispatch(setStorePage(1));
    dispatch(setCategory(category));
    setVisibleCount(isTablet ? 8 : 9);
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

          <TravellersStories stories={visibleStories} storiesRef={storiesRef} />

          {visibleStories.length < totalItems && (
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
