import { useState, useEffect } from 'react';
import shuffleArray from '../utils/shuffleArray';

import he from 'he';
import { ExtractedCategories, TriviaData } from '../types/types';

const useTriviaData = () => {
  const localStorageData: string | null = localStorage.getItem('triviaData');
  const storedTriviaData: ExtractedCategories[] | [] = localStorageData
    ? JSON.parse(localStorageData)
    : [];
  const [triviaData, setTriviaData] = useState<ExtractedCategories[] | []>(storedTriviaData);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchTriviaData = () => {
    setIsLoading(true);
    fetch('https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple')
      .then((response) => response.json())
      .then((data: TriviaData) => {
        const extractedCategories: ExtractedCategories[] = data.results.map(
          (results, index: number) => {
            const answers: string[] = [
              ...results.incorrect_answers,
              results.correct_answer,
            ];
            const decodedAnswers = answers.map((item) => he.decode(item));
            const options: string[] = shuffleArray(decodedAnswers);
            return {
              id: index,
              question: he.decode(results.question),
              correct_answer: he.decode(results.correct_answer),
              options: options,
            };
          }
        );
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

  return { triviaData, isLoading, fetchAgain };
};

export default useTriviaData;
