import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { useParams } from 'react-router-dom';
import Container from '../../components/common/Container/Container';
import Section from '../../components/Section/Section';
import Button from '../../components/UI/Button/Button';
import { PER_PAGE } from '../../constants/pagination';
import MessageNoStories from '../../features/stories/components/MessageNoStories/MessageNoStories';
import TravellersStories from '../../features/stories/components/TravellersStories/TravellersStories';
import TravellerInfo from '../../features/travellers/components/TravellerInfo/TravellerInfo';
import {
  fetchTravellerById,
  fetchTravellerStoriesByIds,
} from '../../features/travellers/store/operation';
import {
  selectTravellerData,
  selectTravellerError,
  selectTravellerPublicStories,
} from '../../features/travellers/store/selectors';

import css from './TravellerPage.module.css';

const TravellerPage = () => {
  const dispatch = useDispatch();
  const { data } = useSelector(selectTravellerData);
  const travellerError = useSelector(selectTravellerError);

  const loadedPublilcStories = useSelector(selectTravellerPublicStories) || [];

  const { travallerId } = useParams();

  const isDeskTop = useMediaQuery({ minWidth: 1440 });

  const [page, setPage] = useState(1);

  const [visibleCount, setVisibleCount] = useState(isDeskTop ? 6 : 4);
  const [slice, setSlice] = useState({ start: 0, end: PER_PAGE });

  const visibleStories = loadedPublilcStories.slice(0, visibleCount);

  //! effects
  //  fetch traveller
  useEffect(() => {
    // eslint-disable-next-line
    setPage(1);
    setSlice({ start: 0, end: PER_PAGE });

    dispatch(fetchTravellerById(travallerId));
  }, [travallerId, dispatch]);

  // fetch traveller stories
  useEffect(() => {
    if (data._id !== travallerId) return;

    const storiesIds = data.publicStories;

    if (!storiesIds?.length) return;

    const ids = storiesIds.slice(slice.start, slice.end);

    dispatch(fetchTravellerStoriesByIds({ page, ids }));
  }, [
    dispatch,
    data.publicStories,
    page,
    slice.end,
    slice.start,
    data._id,
    travallerId,
  ]);

  // change breakpoint
  useEffect(() => {
    // eslint-disable-next-line
    setVisibleCount(isDeskTop ? 6 : 4);
  }, [isDeskTop]);

  // todo handlers
  const handleShowMore = () => {
    const increment = isDeskTop ? 3 : 2;

    const nextVisibleCount = visibleCount + increment;

    if (loadedPublilcStories.length > nextVisibleCount) {
      setVisibleCount(nextVisibleCount);
      return;
    }

    setVisibleCount(nextVisibleCount);

    setPage((prev) => prev + 1);
    setSlice({ start: slice.end, end: slice.end + PER_PAGE });
  };

  return (
    <Section className={css.travellerSection}>
      <Container>
        {!travellerError && <TravellerInfo traveller={data} />}

        <div className={css.travellerStrories}>
          <h1 className={css.title}>Traveller's Stories</h1>

          <TravellersStories stories={visibleStories} />

          {visibleStories.length < loadedPublilcStories.length && (
            <Button className={css.showMoreBtn} onClick={handleShowMore}>
              Show more
            </Button>
          )}

          {!visibleStories.length && (
            <MessageNoStories
              message={
                travellerError
                  ? 'Sorry, no user found'
                  : 'This user has not posted any stories yet'
              }
              messageClassName={css.desktopMessage}
              linkText={'Back to travellers'}
              link={'/travellers'}
            />
          )}
        </div>
      </Container>
    </Section>
  );
};

export default TravellerPage;
