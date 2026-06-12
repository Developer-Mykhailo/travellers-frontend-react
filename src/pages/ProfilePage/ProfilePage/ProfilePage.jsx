// import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Container from '../../../components/common/Container/Container';
import Section from '../../../components/Section/Section';
import TravellerInfo from '../../../features/travellers/components/TravellerInfo/TravellerInfo';
import StoriesToggle from '../../../features/user/components/StoriesToggle/StoriesToggle';
// import { fetchUser } from '../../../features/user/store/operation';
import { selectUser } from '../../../features/user/store/selectors';

import css from './ProfilePage.module.css';

const ProfilePage = () => {
  // const dispatch = useDispatch();
  const user = useSelector(selectUser);
  console.log(user);

  // JSX
  return (
    <Section className={css.profilePage}>
      <Container>
        <TravellerInfo traveller={user} />

        <StoriesToggle />

        <Outlet />
      </Container>
    </Section>
  );
};

export default ProfilePage;
