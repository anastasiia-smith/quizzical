export default function Option({
  questionId,
  option,
  checked,
  answers,
  handleSetAnswers,
  check,
}) {
  return (
    <>
      <label
        className={`question__label ${
          checked ? 'question__label--active' : ''
        } ${
          checked && !check
            ? answers[questionId].correct
              ? 'question__label--correct'
              : 'question__label--incorrect'
            : ''
        }`}
      >
        <input
          onChange={handleSetAnswers}
          className='question__input'
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
