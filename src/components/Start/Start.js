import Button from '../Button/Button.js';
import { Link } from 'react-router-dom';
import styles from './Start.module.css'

export default function Start({ handleStart }) {
  return (
    <>
      <h1 className={`${styles.header} header`}>Quizzical</h1>
      <p className={styles.description}>Some description if needed</p>
      <Link to='trivia'>
        <Button onClick={handleStart}>
          Start quiz
        </Button>
      </Link>
    </>
  );
}
