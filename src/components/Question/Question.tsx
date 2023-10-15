import React from 'react';
import Option from '../Option/Option';
import styles from './Question.module.css';
import { Props } from '../../types/types';

export default function Questions(props: Props) {
  const { id, question, options, answers, onSelect, check } = props;
  const optionsDisplay = options.map((option: string, optionIndex: number) => {
    return (
      <Option
        key={optionIndex}
        questionId={id}
        option={option}
        checked={answers[id].answer === option}
        answers={answers}
        onSelect={(e: any) => onSelect(e)}
        check={check}
      />
    );
  });
  return (
    <fieldset className={styles.group}>
      <legend className={`${styles.header} header`}>{question}</legend>
      {optionsDisplay}
    </fieldset>
  );
}
