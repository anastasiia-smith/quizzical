import Questions from './components/Questions.js';
import { useState, useEffect } from 'react';
import he from 'he';

export default function App() {
  const [start, setStart] = useState(true);
  const [triviaData, setTriviaData] = useState([]);
  const [check, setCheck] = useState(true);

  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple')
      .then((response) => response.json())
      .then((data) => setTriviaData(data.results));
    return () => setTriviaData([]);
  }, []);

  const questions = triviaData.map((item, index) => {
    const answers = item.incorrect_answers.concat(item.correct_answer);
    const decodedAnswers = answers.map((item) => he.decode(item));

    return (
      <Questions
        key={index}
        question={he.decode(item.question)}
        correctAnswer={item.correct_answer}
        answers={shuffle(decodedAnswers)}
        index={index}
      />
    );
  });

  function handleStart() {
    // TODO
    setStart(false);
  }

  function handleCheck() {
    // TODO
    setCheck(false);
  }

  function handleNewStart() {
    // TODO
    setStart(true);
  }
  return (
    <main className={`quiz${!start ? ' active' : ''}`}>
      {start ? (
        <>
          <h1 className='quiz__header header'>Quizzical</h1>
          <p className='quiz__description'>Some description if needed</p>
          <button onClick={handleStart} className='quiz__button'>
            Start quiz
          </button>
        </>
      ) : (
        <>
          <div className='quiz__questions'>{questions}</div>
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

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
