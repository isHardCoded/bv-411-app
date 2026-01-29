import { Outlet } from 'react-router';
import { Header } from '../components/Header/Header';

import s from './styles.module.css';

export const MainLayout = () => {
  return (
    <>
      <Header />
      <main className={s.main}>
        <Outlet />
      </main>
    </>
  );
};
