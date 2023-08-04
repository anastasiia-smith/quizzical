import Option from './Option.js';

export default function Questions({
  id,
  question,
  options,
  answers,
  onSelect,
  check,
}) {
  const optionsDisplay = options.map((option, optionIndex) => {
    return (
      <Option
        key={optionIndex}
        questionId={id}
        option={option}
        checked={answers[id].answer === option}
        answers={answers}
        onSelect={(e) => onSelect(e)}
        check={check}
      />
    );
  });
  return (
    <fieldset className='question__group'>
      <legend className='question__header header'>{question}</legend>
      {optionsDisplay}
    </fieldset>
  );
}
