import Button from './Button.js';
import { Link } from 'react-router-dom';

export default function Start({ handleStart }) {
  return (
    <>
      <h1 className='quiz__header header'>Quizzical</h1>
      <p className='quiz__description'>Some description if needed</p>
      <Link to='trivia'>
        <Button onClick={handleStart} className='quiz__button'>
          Start quiz
        </Button>
      </Link>
    </>
  );
}
