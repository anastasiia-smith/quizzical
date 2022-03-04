import Question from "./components/Question.js"
import {useState, useEffect} from "react"

export default function App() {
  const [start, setStart] = useState(true)
  const [triviaData, setTriviaData] = useState([])

  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=5&category=19&difficulty=easy&type=multiple')
    .then(response => response.json())
    .then(data => setTriviaData(data.results));

    return () => setTriviaData([]);
  }, [])
  
  function handleStart() {
    setStart(false)
  }
  return(
    <main className={`quiz${!start ? " active" : ""}`}>
      {
        start
        ?
        <>
          <h1 className="quiz__header quiz__header--main">Quizzical</h1>
          <p className="quiz__description">Some description if needed</p>
          <button 
            onClick={handleStart}
            className="quiz__button"
          >
            Start quiz
          </button>
        </>
        :
        <div className="quiz__question">
          <Question />
        </div>
      }
    </main>

  )
}