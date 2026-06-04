import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { useParams } from 'react-router-dom';
import Container from '../../components/common/Container/Container';
import Section from '../../components/Section/Section';
import Button from '../../components/UI/Button/Button';
import MessageNoStories from '../../features/stories/components/MessageNoStories/MessageNoStories';
import TravellersStories from '../../features/stories/components/TravellersStories/TravellersStories';
import { fetchPublicStoryByIdApi } from '../../features/stories/store/operation';
import TravellerInfo from '../../features/travellers/components/TravellerInfo/TravellerInfo';
import { fetchTravellerByIdApi } from '../../features/travellers/store/operation';
import {
  selectLoadedPublilcStories,
  selectUserData,
} from '../../features/travellers/store/selectors';
import {
  appendUserPublicStories,
  setUser,
  setUserPublicStories,
} from '../../features/travellers/store/slice';

import css from './TravellerPage.module.css';

const TravellerPage = () => {
  const dispatch = useDispatch();

  const user = useSelector(selectUserData);

  const loadedPublilcStories = useSelector(selectLoadedPublilcStories) || [];

  const { travallerId } = useParams();

  const isDeskTop = useMediaQuery({ minWidth: 1440 });

  const pageSize = isDeskTop ? 6 : 4;

  const [page, setPage] = useState(1);

  const [publicStoriesIds, setPublicStoriesIds] = useState([]);

  const visiblePublicStories = loadedPublilcStories.slice(0, page * pageSize);

  // user
  useEffect(() => {
    dispatch(setUser({}));
    dispatch(setUserPublicStories([]));

    (() => {
      setPage(1);
      setPublicStoriesIds([]);
    })();

    fetchTraveller();

    async function fetchTraveller() {
      try {
        const travellerData = await fetchTravellerByIdApi(travallerId);

        dispatch(setUser(travellerData));

        setPublicStoriesIds(travellerData?.publicStories ?? []);
      } catch (error) {
        console.log(error);
      }
    }
  }, [travallerId, dispatch]);

  // stories
  useEffect(() => {
    if (!publicStoriesIds.length) return;

    const requiredStoriesCount = page * pageSize;

    const missingStories = requiredStoriesCount - loadedPublilcStories.length;

    if (missingStories <= 0) return;

    loadStories();

    async function loadStories() {
      try {
        const ids = publicStoriesIds.slice(
          loadedPublilcStories.length,
          loadedPublilcStories.length + missingStories
        );

        const stories = await Promise.all(
          ids.map((id) => fetchPublicStoryByIdApi(id))
        );

        if (!stories.length) return;

        if (loadedPublilcStories.length === 0) {
          dispatch(setUserPublicStories(stories));
        } else {
          dispatch(appendUserPublicStories(stories));
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, [publicStoriesIds, page, pageSize, loadedPublilcStories.length, dispatch]);

  const handleShowMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <Section className={css.travellerSection}>
      <Container>
        <TravellerInfo userData={user} />

        <article className={css.travellerStrories}>
          <h1 className={css.title}>Traveller's Stories</h1>

          <TravellersStories stories={visiblePublicStories} />

          {visiblePublicStories.length < publicStoriesIds.length && (
            <Button className={css.showMoreBtn} onClick={handleShowMore}>
              Show more
            </Button>
          )}

          {!visiblePublicStories.length && (
            <MessageNoStories
              message="This user has not posted any stories yet"
              messageClassName={css.desktopMessage}
              linkText={'Back to travellers'}
              link={'/travellers'}
            />
          )}
        </article>
      </Container>
    </Section>
  );
};

export default TravellerPage;
