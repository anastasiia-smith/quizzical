import { useState, useEffect } from 'react';
import shuffleArray from '../utils/shuffleArray'

import he from 'he';

export default function useTriviaData() {
  const storedTriviaData = JSON.parse(localStorage.getItem('triviaData')) || [];
  const [triviaData, setTriviaData] = useState(storedTriviaData);
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
          options: shuffleArray(
            [...obj.incorrect_answers, obj.correct_answer].map((item) =>
              he.decode(item)
            )
          ),
        }));
        localStorage.setItem('triviaData', JSON.stringify(extractedCategories));
        setTriviaData(extractedCategories);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching trivia data:', error);
        setIsLoading(false);
      });
  };

  const fetchAgain = () => {
    fetchTriviaData();
  };

  useEffect(() => {
    if (storedTriviaData.length === 0) {
      fetchTriviaData();
    }
    return () => setTriviaData([]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { triviaData,  isLoading, fetchAgain };
};
