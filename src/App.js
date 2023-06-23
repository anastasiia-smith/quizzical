import Question from './components/Question.js';
import { useState, useEffect } from 'react';

export default function App() {
  const [start, setStart] = useState(true);
  const [triviaData, setTriviaData] = useState([]);
  const [check, setCheck] = useState(true);

  useEffect(() => {
    fetch(
      'https://opentdb.com/api.php?amount=5&category=19&difficulty=easy&type=multiple'
    )
      .then((response) => response.json())
      .then((data) => setTriviaData(data.results));
    return () => setTriviaData([]);
  }, []);

  const questions = triviaData.map((item, index) => {
    const answers = item.incorrect_answers.concat(item.correct_answer);
    return (
      <Question
        key={index}
        question={item.question}
        answers={answers}
        index={index}
      />
    );
  });

  function handleStart() {
    setStart(false);
  }

  function handleCheck() {
    setCheck(false);
  }

  function handleNewStart() {
    setStart(true);
  }
  return (
    <main className={`quiz${!start ? ' active' : ''}`}>
      {start ? (
        <>
          <h1 className='quiz__header header'>
            Quizzical
          </h1>
          <p className='quiz__description'>Some description if needed</p>
          <button onClick={handleStart} className='quiz__button'>
            Start quiz
          </button>
        </>
      ) : (
        <>
          <div className='quiz__questions questions'>{questions}</div>
          <div className='quiz__footer'>
            {check ? (
              <button onClick={handleCheck} className='quiz__button'>
                Check answers
              </button>
            ) : (
              <>
                <p className='score'>You scored 3/5 correct answers</p>
                <button onClick={handleNewStart} className='quiz__button'>
                  Play again
                </button>
              </>
            )}
          </div>
        </>
      )}
    </main>
  );
}
