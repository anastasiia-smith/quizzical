import Questions from './components/Questions.js';
import Button from './components/Button.js';
import { useState, useEffect } from 'react';
import he from 'he';

export default function App() {
  const [start, setStart] = useState(true);
  const [triviaData, setTriviaData] = useState([]);
  const [check, setCheck] = useState(true);
  const [answers, setAnswers] = useState([
    { answer: '', correct: false },
    { answer: '', correct: false },
    { answer: '', correct: false },
    { answer: '', correct: false },
    { answer: '', correct: false },
  ]);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);

  // Setting trivia data based on API fetch.
  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple')
      .then((response) => response.json())
      .then((data) => {
        const extractedCategories = data.results.map((obj, index) => ({
          id: index,
          question: he.decode(obj.question),
          correct_answer: he.decode(obj.correct_answer),
          options: shuffle(
            [...obj.incorrect_answers, obj.correct_answer].map((item) =>
              he.decode(item)
            )
          ),
        }));
        setTriviaData(extractedCategories);
      });
    return () => setTriviaData([]);
  }, []);

  function handleStart() {
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
    window.location.reload();
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
        <>
          <Questions triviaData={triviaData} handleSetAnswers={handleSetAnswers} answers={answers} check={check}/>
          <div className='quiz__footer'>
            {check ? (
              <Button onClick={handleCheck} className='quiz__button'>
                Check answers
              </Button>
            ) : (
              <>
                <span className='score'>
                  You scored {correctAnswersCount} correct answer
                  {correctAnswersCount > 1 || correctAnswersCount === 0
                    ? 's'
                    : ''}
                </span>
                <Button onClick={handleNewStart} className='quiz__button'>
                  Play again
                </Button>
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

  // While there remain elements to shuffle
  while (currentIndex !== 0) {
    // Pick a remaining element
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}
