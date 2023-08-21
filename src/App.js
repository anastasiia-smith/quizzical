import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import TriviaContent from './components/TriviaContent/TriviaContent.js';
import Layout from './components/Layout/Layout.js';
import Start from './components/Start/Start.js';
import Notfound from './components/Nonfound/Notfound.js';

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
