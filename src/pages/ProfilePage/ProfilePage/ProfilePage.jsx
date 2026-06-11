import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Container from '../../../components/common/Container/Container';
import Section from '../../../components/Section/Section';
import StoriesToggle from '../../../features/user/components/StoriesToggle/StoriesToggle';

import css from './ProfilePage.module.css';
import { fetchUser } from '../../../features/user/store/operation';

const ProfilePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  // JSX
  return (
    <Section className={css.profilePage}>
      <Container>
        {/* <TravellerInfo traveller={ } /> */}

        <StoriesToggle />

        <Outlet />
      </Container>
    </Section>
  );
};

export default ProfilePage;
