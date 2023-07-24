import Question from './Question.js';
import Button from './Button.js';
import { useState } from 'react';

export default function Questions({ triviaData, handleNewStart }) {
  const [check, setCheck] = useState(true);
  const [answers, setAnswers] = useState([
    { answer: '', correct: false },
    { answer: '', correct: false },
    { answer: '', correct: false },
    { answer: '', correct: false },
    { answer: '', correct: false },
  ]);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);

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

  const questions = triviaData.map((item) => {
    return (
      <Question
        key={item.id}
        id={item.id}
        question={item.question}
        options={item.options}
        answers={answers}
        handleSetAnswers={handleSetAnswers}
        check={check}
      />
    );
  });
  return (
    <>
      <div className='quiz__questions'>{questions}</div>
      <div className='quiz__footer'>
        {check ? (
          <Button onClick={handleCheck} className='quiz__button'>
            Check answers
          </Button>
        ) : (
          <>
            <span className='score'>
              You scored {correctAnswersCount} correct answer
              {correctAnswersCount > 1 || correctAnswersCount === 0 ? 's' : ''}
            </span>
            <Button onClick={handleNewStart} className='quiz__button'>
              Play again
            </Button>
          </>
        )}
      </div>
    </>
  );
}
