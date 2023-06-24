import { useState } from 'react';

export default function Option(props) {
  return (
    <>
      <label className='question__label'>
        <input
          className='question__input'
          type='radio'
          name={'radio-' + props.index}
          value={props.answer}
        />
        {props.answer}
      </label>
    </>
  );
}
