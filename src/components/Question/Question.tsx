import Option from '../Option/Option';
import styles from './Question.module.css';

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
    <fieldset className={styles.group}>
      <legend className={`${styles.header} header`}>{question}</legend>
      {optionsDisplay}
    </fieldset>
  );
}
