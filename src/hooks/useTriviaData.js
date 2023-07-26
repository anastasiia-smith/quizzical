import { useState, useEffect } from 'react';

import he from 'he';

const useTriviaData = () => {
  const [triviaData, setTriviaData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTriviaData = () => {
    setIsLoading(true);
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
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching trivia data:', error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    return () => setTriviaData([]);
  }, []);

  return { triviaData,  isLoading, fetchTriviaData };
};

export default useTriviaData;

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
