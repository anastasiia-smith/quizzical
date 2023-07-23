import Option from './Option';
import { useState } from 'react';

export default function Questions({id, question, options, answers, handleSetAnswers}) {
  const optionsDisplay = options.map((option, optionIndex) => {
    return <Option key={optionIndex} questionId={id} index={optionIndex} option={option} answers={answers} handleSetAnswers={e => handleSetAnswers(e)}/>;
  });
  return (
    <fieldset className='question__group'>
      <legend className='question__header header'>{question}</legend>
      {optionsDisplay}
    </fieldset>
  );
}
