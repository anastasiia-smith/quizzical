import React from 'react';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import TriviaContent from './components/TriviaContent/TriviaContent';
import Layout from './components/Layout/Layout';
import Start from './components/Start/Start';
import Notfound from './components/Nonfound/Notfound';

export default function App() {
  const [start, setStart] = useState(true);

  function handleStart() {
    setStart(false);
  }
  return (
    <Routes>
      <Route path='/' element={<Layout start={start} />}>
        <Route index element={<Start handleStart={handleStart} />}></Route>
        <Route
          path='trivia'
          element={
            <TriviaContent />
          }
        ></Route>
        <Route path='*' element={<Notfound />} />
      </Route>
    </Routes>
  );
}
