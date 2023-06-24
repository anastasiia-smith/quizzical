import Questions from './components/Questions.js';
import { useState, useEffect } from 'react';
import he from 'he';

export default function App() {
  const [start, setStart] = useState(true);
  const [triviaData, setTriviaData] = useState([]);
  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple')
      .then((response) => response.json())
      .then((data) => {
        const extractedCategories = data.results.map((obj, index) => ({
          id: index,
          question: he.decode(obj.question),
          correct_answer: he.decode(obj.correct_answer),
          answers: shuffle([...obj.incorrect_answers, obj.correct_answer].map(item => he.decode(item))),
        }));
        setTriviaData(extractedCategories);
      });
    return () => setTriviaData([]);
  }, []);

  function handleStart() {
    setStart(false);
  }

  function handleNewStart() {
    window.location.reload();
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
          <Questions triviaData={triviaData} handleNewStart={handleNewStart} />
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
