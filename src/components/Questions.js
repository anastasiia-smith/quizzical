import Question from './Question.js';
import Button from './Button.js';
import { useState } from 'react';

export default function Questions({ triviaData, handleNewStart }) {
  const [check, setCheck] = useState(true);

  function handleCheck() {
    // TODO check
    setCheck(false);
  }
  const questions = triviaData.map((item) => {
    return (
      <Question
        key={item.id}
        id={item.id}
        question={item.question}
        correctAnswer={item.correct_answer}
        options={item.options}
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
