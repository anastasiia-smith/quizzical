import { useState } from 'react';

export default function Option({questionId, index, option, answers, handleSetAnswers}) {
  const activeClass = answers[questionId] === option ? 'active' : '';
  return (
    <>
      <label className={'question__label ' + activeClass}>
        <input
          onChange={handleSetAnswers}
          className='question__input'
          type='radio'
          name={'radio-' + questionId}
          value={option}
          data-question-id={questionId}
        />
        {option}
      </label>
    </>
  );
}
