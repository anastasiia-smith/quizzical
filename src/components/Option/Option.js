import styles from './Option.module.css';

export default function Option({
  questionId,
  option,
  checked,
  answers,
  onSelect,
  check,
}) {
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
