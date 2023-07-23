import Question from './Question.js';
import Button from './Button.js';
import { useState } from 'react';

export default function Questions({ triviaData, handleNewStart }) {
  const [check, setCheck] = useState(true);
  const [answers, setAnswers] = useState(['', '', '', '', ''])
  console.log(answers)
  function handleCheck() {
    // TODO check
    setCheck(false);
  }

  function handleSetAnswers(e) {
    const myNextAnswers = [...answers];
    myNextAnswers[e.target.getAttribute('data-question-id')] = e.target.value;
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
