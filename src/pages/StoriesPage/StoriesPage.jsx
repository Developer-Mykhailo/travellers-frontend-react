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
  selectPublicStories,
} from '../../features/stories/store/selectors';

import css from './StoriesPage.module.css';

const StoriesPage = () => {
  const dispatch = useDispatch();

  const { items, hasNextPage, totalItems } = useSelector(selectPublicStories); //state

  const categories = useSelector(selectCategories);

  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1439 });

  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [visibleCount, setVisibleCount] = useState(isTablet ? 8 : 9);

  const allCategories = useMemo(
    () => [{ _id: 'all', name: 'All Stories' }, ...categories],
    [categories]
  );

  const visibleStories = items.slice(0, visibleCount);

  const storiesRef = useRef(null);

  //! effects
  //fetch stories
  useEffect(() => {
    dispatch(
      fetchPublicStories({
        page,
        perPage: PER_PAGE,
        category: selectedCategory === 'All Stories' ? null : selectedCategory,
      })
    );
  }, [dispatch, page, selectedCategory]);

  // fetch categories
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // breakpoint change
  useEffect(() => {
    // eslint-disable-next-line
    setVisibleCount(isTablet ? 8 : 9);
  }, [isTablet]);

  // scroll
  // useEffect(() => {
  //   const liHeight = storiesRef?.current?.firstElementChild?.offsetHeight ?? 0;

  //   window.scrollBy({
  //     top: liHeight + 24,
  //     behavior: 'smooth',
  //   });
  // }, [visibleCount]);

  //todo handlers
  const handleShowMore = () => {
    const increment = isTablet ? 8 : 9;
    const nextVisibleCount = visibleCount + increment;

    if (items.length > nextVisibleCount) {
      setVisibleCount(nextVisibleCount);
      return;
    }

    setVisibleCount(nextVisibleCount);

    hasNextPage && setPage((prev) => prev + 1);
  };

  //
  const handleChangeCategory = (category) => {
    setPage(1);
    setSelectedCategory(category);
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
