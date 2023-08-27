import { useState } from 'react';
import Questions from '../Questions/Questions.js';
import Button from '../Button/Button.js';
import styles from './TriviaContent.module.css'
import useTriviaData from '../../hooks/useTriviaData.js'

export default function TriviaContent() {
  const [check, setCheck] = useState(true);
  const [answers, setAnswers] = useState([
    { answer: '', correct: false },
    { answer: '', correct: false },
    { answer: '', correct: false },
    { answer: '', correct: false },
    { answer: '', correct: false },
  ]);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const { triviaData, isLoading, fetchAgain } = useTriviaData();
  const areAllAnswersFilled = answers.every(item => item.answer !== '');

  function handleCheck() {
    const correctAnswers = answers.filter(function (item) {
      return item.correct === true;
    });
    setCorrectAnswersCount(correctAnswers.length);
    setCheck(false);
    localStorage.removeItem('triviaData');
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

  // Fetching new data when play again pushed.
  function handleNewStart() {
    fetchAgain();
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
    <>
      {isLoading ? (
        <>
          <svg
            className={styles.loader}
            xmlns='http://www.w3.org/2000/svg'
            x='0px'
            y='0px'
            viewBox='0 0 100 100'
            enable-background='new 0 0 0 0'
          >
            <path
              fill='#4d5b9e'
              d='M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50'
            >
              <animateTransform
                attributeName='transform'
                attributeType='XML'
                type='rotate'
                dur='1s'
                from='0 50 50'
                to='360 50 50'
                repeatCount='indefinite'
              />
            </path>
          </svg>
        </>
      ) : (
        <>
          <Questions
            triviaData={triviaData}
            handleSetAnswers={handleSetAnswers}
            answers={answers}
            check={check}
          />
          <div className={styles.footer}>
            {check ? (
              <Button onClick={handleCheck} disabled={!areAllAnswersFilled}>
                Check answers
              </Button>
            ) : (
              <>
                <span className={styles.score}>
                  You scored {correctAnswersCount} correct answer
                  {correctAnswersCount > 1 || correctAnswersCount === 0
                    ? 's'
                    : ''}
                </span>
                <Button onClick={handleNewStart}>
                  Play again
                </Button>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}
