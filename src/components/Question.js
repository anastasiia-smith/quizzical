import Option from './Option';

export default function Questions(props) {
  const options = props.options.map((option, optionIndex) => {
    return <Option key={optionIndex} index={optionIndex} option={option} />;
  });
  return (
    <fieldset className='question__group'>
      <legend className='question__header header'>{props.question}</legend>
      {options}
    </fieldset>
  );
}
