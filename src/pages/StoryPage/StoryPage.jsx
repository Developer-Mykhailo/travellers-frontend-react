import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import StoryActions from '../../features/STORIES/components/StoryActions/StoryActions';
import placeholder from '../../assets/images/placeholder.jpg';
import Popular from '../../components/PopularStories/Popular';
import Section from '../../components/Section/Section';
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
  }, [dispatch, storyId, _id]);

  useEffect(() => {
    window.scrollTo(0, 242);
  });

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

            <StoryActions storyId={_id} owner={owner} />
          </div>
        </Container>
      </Section>

      <Popular />
    </>
  );
};

export default StoryPage;
