import clsx from 'clsx';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import Container from '../../components/common/Container/Container';
import Section from '../../components/Section/Section';

import css from './AuthPage.module.css';

const AuthPage = () => {
  const location = useLocation();

  const title = location.pathname === '/auth/register' ? 'Register' : 'Login';

  const descr =
    location.pathname === '/auth/register'
      ? 'Glad to see you in the traveller community!'
      : 'Welcome back to the traveller community!';

  //
  const buildLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };

  // JSX
  return (
    <>
      <Section>
        <Container className={css.container}>
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

          <h1 className={css.title}>{title}</h1>
          <p className={css.descr}>{descr}</p>

          <Outlet />

          <small className={css.copyright}>© 2026 Подорожники</small>
        </Container>
      </Section>
    </>
  );
};

export default AuthPage;
