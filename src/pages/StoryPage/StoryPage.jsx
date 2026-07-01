import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import placeholder from '../../assets/images/placeholder.jpg';
import Popular from '../../components/PopularStories/Popular';
import Section from '../../components/Section/Section';
import Button from '../../components/UI/Button/Button';
import Container from '../../components/common/Container/Container';
import { fetchPublicStoryById } from '../../features/stories/store/operation';
import { selectStory } from '../../features/stories/store/selectors';

import css from './StoryPage.module.css';

const StoryPage = () => {
  const dispatch = useDispatch();

  const { storyId } = useParams();

  const story = useSelector(selectStory);
  const { owner, title, date, category, article, img, _id } = story;

  // ! effects
  useEffect(() => {
    if (_id === storyId) return;

    dispatch(fetchPublicStoryById(storyId));

    document.documentElement.style.scrollBehavior = 'smooth';

    setTimeout(() => {
      window.scrollTo({
        top: 120,
        behavior: 'smooth',
      });
    }, 100);
  }, [dispatch, storyId, _id]);

  // JSX
  return (
    <>
      <Section className={css.storySection}>
        <Container>
          <h1 className={css.storyTitle}>{title}</h1>
          <div className={css.storyData}>
            <p className={css.nameAuthor}>
              <span>Author </span>
              {owner?.name}
            </p>
            <p className={css.published}>
              <span>Published </span>
              {date}
            </p>
            <span className={css.category}>{category?.name || category}</span>
          </div>
          <div className={css.wrapImg}>
            <img src={img || placeholder} alt="story picture" />
          </div>

          <div className={css.contentBox}>
            <p className={css.descr}>{article}</p>
            <div className={css.saveStoryBox}>
              <p className={css.saveStorytitle}>Keep the story </p>
              <p className={css.saveStoryDescr}>
                It will be available in your profile in the saved section
              </p>
              <Button className={css.saveStoryBtn}>Save</Button>
            </div>
          </div>
        </Container>
      </Section>

      <Popular />
    </>
  );
};

export default StoryPage;
