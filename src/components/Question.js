import Answer from './Answer';

export default function Questions(props) {
  const options = props.answers.map((item, index) => {
    return <Answer key={index} index={index} answer={item} />;
  });
  return (
    <fieldset className='question__group'>
      <legend className='question__header header'>{props.question}</legend>
      {options}
    </fieldset>
  );
}
