import { useState } from 'react';

export default function Question(props) {
  const [value, setValue] = useState('');
  function changeValue(event) {
    setValue(event.target.value);
  }
  return (
    <fieldset className='questions__group'>
      <legend className='questions__header header'>
        {props.question}
      </legend>
      {props.answers.map((item) => (
        <label className='questions__label' key={item}>
          <input
            className='questions__input'
            type='radio'
            name={'radio-' + props.index}
            value={item}
            checked={value == {item} ? true : false}
            onChange={changeValue}
          />
          {item}
        </label>
      ))}
    </fieldset>
  );
}
