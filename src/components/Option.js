import { useState } from 'react';

export default function Option({questionId, option, answers, handleSetAnswers}) {
  // creating a variable with active class if option selected
  const activeClass = answers[questionId].answer === option ? 'active' : '';
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
