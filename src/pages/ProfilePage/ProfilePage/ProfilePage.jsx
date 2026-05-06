import { Outlet } from 'react-router-dom';
import Container from '../../../components/common/Container/Container';
import Section from '../../../components/Section/Section';
import TravellerInfo from '../../../features/travellers/components/TravellerInfo/TravellerInfo';
import StoriesToggle from '../../../features/user/components/StoriesToggle/StoriesToggle';

import css from './ProfilePage.module.css';

const ProfilePage = () => {
  //

  // JSX
  return (
    <Section className={css.profilePage}>
      <Container>
        <TravellerInfo />

        <StoriesToggle />

        <Outlet />
      </Container>
    </Section>
  );
};

export default ProfilePage;
