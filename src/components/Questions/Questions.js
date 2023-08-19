import Question from '../Question/Question.js';
import styles from './Questions.module.css';

export default function Questions({
  triviaData,
  handleSetAnswers,
  answers,
  check,
}) {
  const questions = triviaData.map((item) => {
    return (
      <Question
        key={item.id}
        id={item.id}
        question={item.question}
        options={item.options}
        answers={answers}
        onSelect={handleSetAnswers}
        check={check}
      />
    );
  });
  return <form className={styles.questions}>{questions}</form>;
}
