import { Outlet } from 'react-router-dom';
import quiz from './Layout.module.css';

export default function Layout({ start }) {
  return (
    <main className={`${quiz.quiz}${!start ? ` ${quiz.active}` : ''}`}>
      <Outlet />
    </main>
  );
}
