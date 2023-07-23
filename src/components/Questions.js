import Question from './Question.js';
import Button from './Button.js';
import { useState } from 'react';

export default function Questions({ triviaData, handleNewStart, correctAnswers }) {
  const [check, setCheck] = useState(true);
  const [answers, setAnswers] = useState([
    { answer: '', correct: false },
    { answer: '', correct: false },
    { answer: '', correct: false },
    { answer: '', correct: false },
    { answer: '', correct: false },
  ]);
  
  function handleCheck() {
    // TODO check
    setCheck(false);
  }

  function handleSetAnswers(e) {
    // Creating a new array from previous
    const myNextAnswers = [...answers];
    // Getting the id of question and value of selected option
    const dataQuestionId = e.target.getAttribute('data-question-id');
    const answer = e.target.value;
    // Storing the data in the n-th array element
    myNextAnswers[dataQuestionId].answer = answer;
    if (answer === correctAnswers[dataQuestionId]) {
      myNextAnswers[dataQuestionId].correct = true;
    } else {
      myNextAnswers[dataQuestionId].correct = false;
    }
    // Setting new state
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
            <p className='score'>You scored 3/5 correct answers</p>
            <Button onClick={handleNewStart} className='quiz__button'>
              Play again
            </Button>
          </>
        )}
      </div>
    </>
  );
}
