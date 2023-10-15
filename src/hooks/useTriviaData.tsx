import { useState, useEffect } from 'react';
import shuffleArray from '../utils/shuffleArray'

import he from 'he';

export interface Obj {
  question: string,
  correct_answer: string,
}

export interface ExtractedCategories {
  id: number,
  question: string,
  correct_answer: string,
  options(array: []): [],
}

const useTriviaData = () => {
  const localStorageData: string | null = localStorage.getItem('triviaData');
  const storedTriviaData: [] = localStorageData ? JSON.parse(localStorageData) : [];
  console.log('anaii', storedTriviaData);
  const [triviaData, setTriviaData] = useState(storedTriviaData);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTriviaData = () => {
    setIsLoading(true);
    fetch('https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple')
      .then((response) => response.json())
      .then((data) => {
        const extractedCategories: ExtractedCategories = data.results.map((obj: Obj, index: number) => ({
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

export default useTriviaData;