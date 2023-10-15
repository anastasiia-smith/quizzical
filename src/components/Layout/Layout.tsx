import React from 'react';
import { Outlet } from 'react-router-dom';
import quiz from './Layout.module.css';

interface Props {
  start: boolean;
}

export default function Layout(props: Props) {
  const { start } = props
  return (
    <main className={`${quiz.quiz}${!start ? ` ${quiz.active}` : ''}`}>
      <Outlet />
    </main>
  );
}
