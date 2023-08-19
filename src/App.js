import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import useTriviaData from './hooks/useTriviaData';
import TriviaContent from './components/TriviaContent/TriviaContent.js';
import Layout from './components/Layout/Layout.js';
import Start from './components/Start/Start.js';
import Notfound from './components/Nonfound/Notfound.js';

export default function App() {
  const [start, setStart] = useState(true);
  const { triviaData, isLoading, fetchTriviaData } = useTriviaData();
  const [check, setCheck] = useState(true);
  const [answers, setAnswers] = useState([
    { answer: '', correct: false },
    { answer: '', correct: false },
    { answer: '', correct: false },
    { answer: '', correct: false },
    { answer: '', correct: false },
  ]);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);

  function handleStart() {
    fetchTriviaData();
    setStart(false);
  }

  function handleCheck() {
    const correctAnswers = answers.filter(function (item) {
      return item.correct === true;
    });
    setCorrectAnswersCount(correctAnswers.length);
    setCheck(false);
  }

  function handleSetAnswers(e) {
    // Creating a new array from previous.
    const myNextAnswers = [...answers];
    // Getting the id of question and value of selected option.
    const dataQuestionId = e.target.getAttribute('data-question-id');
    const answer = e.target.value;
    // Storing the data in the n-th array element.
    myNextAnswers[dataQuestionId].answer = answer;
    if (answer === triviaData[dataQuestionId].correct_answer) {
      myNextAnswers[dataQuestionId].correct = true;
    } else {
      myNextAnswers[dataQuestionId].correct = false;
    }
    // Setting new state.
    setAnswers(myNextAnswers);
  }

  // Refreshing the window to a new start.
  function handleNewStart() {
    fetchTriviaData();
    if (!isLoading) {
      setCheck(true);
      setAnswers([
        { answer: '', correct: false },
        { answer: '', correct: false },
        { answer: '', correct: false },
        { answer: '', correct: false },
        { answer: '', correct: false },
      ]);
      setCorrectAnswersCount(0);
    }
  }

  return (
    <Routes>
      <Route path='/quizzical' element={<Layout start={start} />}>
        <Route index element={<Start handleStart={handleStart} />}></Route>
        <Route
          path='trivia'
          element={
            <TriviaContent
              triviaData={triviaData}
              handleSetAnswers={handleSetAnswers}
              answers={answers}
              check={check}
              correctAnswersCount={correctAnswersCount}
              handleCheck={handleCheck}
              handleNewStart={handleNewStart}
              isLoading={isLoading}
            />
          }
        ></Route>
        <Route path='*' element={<Notfound />} />
      </Route>
    </Routes>
  );
}
