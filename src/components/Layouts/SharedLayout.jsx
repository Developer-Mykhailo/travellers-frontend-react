import css from './SharedLayout.module.css';

import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

const SharedLayout = () => {
  return (
    <div className={css.layout}>
      <Header />

      <main className={css.main}>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default SharedLayout;
