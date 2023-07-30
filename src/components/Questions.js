import Question from './Question.js';

export default function Questions({ triviaData, handleSetAnswers, answers, check }) {
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
  return (
    <form className='quiz__questions'>{questions}</form>
  );
}
