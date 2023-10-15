import React from 'react'
import Button from '../Button/Button';
import { Link } from 'react-router-dom';
import styles from './Start.module.css'

export interface Props {
  handleStart: () => void,
}

const Start: React.FC<Props> = (props) => {
  const { handleStart } = props;
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

export default Start;