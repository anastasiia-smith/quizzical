import React from 'react';
import Question from '../Question/Question';
import styles from './Questions.module.css';
import { ExtractedCategories, Props } from '../../types/types';

export default function Questions(props: Props) {
  const { triviaData, handleSetAnswers, answers, check } = props;
  const questions = triviaData.map((item: ExtractedCategories) => {
    return (
      <Question
        key={item.id}
        id={item.id}
        question={item.question}
        options={item.options}
        answers={answers}
        onSelect={handleSetAnswers}
        check={check}
      />
    );
  });
  return <form className={styles.questions}>{questions}</form>;
}
