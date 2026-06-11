import css from './AuthPage.module.css';

import { NavLink, Outlet } from 'react-router-dom';
import Container from '../../components/common/Container/Container';
import Section from '../../components/Section/Section';

import clsx from 'clsx';

const AuthPage = () => {
  const buildLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };

  // JSX
  return (
    <>
      <Section>
        <Container>
          <ul className={css.list}>
            <li>
              <NavLink className={buildLinkClass} to={'register'}>
                Register
              </NavLink>
            </li>
            <li>
              <NavLink className={buildLinkClass} to={'login'}>
                Login
              </NavLink>
            </li>
          </ul>

          <Outlet />
        </Container>
      </Section>
    </>
  );
};

export default AuthPage;
