import { useMediaQuery } from 'react-responsive';
import ArrowDown from '../../assets/icons/keyboard_arrow_down.svg?react';
import Container from '../../components/common/Container/Container';
import Section from '../../components/Section/Section';
import Button from '../../components/UI/Button/Button';
import TravellersStoriesItem from '../../features/stories/components/TravellersStoriesItem/TravellersStoriesItem';
import storyCategories from '../../../temp/categories.json';
import css from './StoriesPage.module.css';

const StoriesPage = () => {
  const isTablet = useMediaQuery({ query: '(min-width: 768px)' });
  const categories = storyCategories.data;
  const allCategories = [{ _id: 'all', name: 'All Stories' }, ...categories];

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
                    <option value={cat.name}>{cat.name}</option>
                  ))}
                </select>
                <ArrowDown className={css.arrowDown} />
              </div>
            </>
          )}

          <TravellersStoriesItem />

          <Button className={css.showMoreBtn}>Show more</Button>
        </Container>
      </Section>
    </>
  );
};

export default StoriesPage;
