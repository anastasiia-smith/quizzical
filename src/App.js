import { useState } from 'react';
import useTriviaData from './hooks/useTriviaData';
import Button from './components/Button.js';
import TriviaContent from './components/TriviaContent.js';

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
    if(!isLoading){
      setCheck(true);
      setAnswers([
        { answer: '', correct: false },
        { answer: '', correct: false },
        { answer: '', correct: false },
        { answer: '', correct: false },
        { answer: '', correct: false },
      ]);
    setCorrectAnswersCount(0);}
  }

  return (
    <main className={`quiz${!start ? ' active' : ''}`}>
      {start ? (
        <>
          <h1 className='quiz__header header'>Quizzical</h1>
          <p className='quiz__description'>Some description if needed</p>
          <Button onClick={handleStart} className='quiz__button'>
            Start quiz
          </Button>
        </>
      ) : (
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
      )}
    </main>
  );
}
