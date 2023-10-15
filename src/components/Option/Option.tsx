import React from 'react';
import styles from './Option.module.css';
import { Props } from '../../types/types';

export default function Option(props: Props) {
  const {
    questionId,
    option,
    checked,
    answers,
    onSelect,
    check,
  } = props;
  return (
    <>
      <label
        className={`${styles.label} ${
          checked ? `${styles.active}` : ''
        } ${
          checked && !check
            ? answers[questionId].correct
              ? `${styles.correct}`
              : `${styles.incorrect}`
            : ''
        }`}
      >
        <input
          onChange={onSelect}
          className={styles.input}
          type='radio'
          name={'radio-' + questionId}
          value={option}
          data-question-id={questionId}
          disabled={!check ? true : false}
        />
        {option}
      </label>
    </>
  );
}
