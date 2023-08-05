import { Outlet } from 'react-router-dom';

export default function Layout({ start }) {
  return (
    <main className={`quiz${!start ? ' active' : ''}`}>
      <Outlet />
    </main>
  );
}
