import React from 'react'
import styles from './Button.module.css';

export interface Props {
  onClick: () => void,
  disabled?: boolean,
  children: string | JSX.Element,
}

const Button: React.FC<Props> = (props) => {
  const { onClick, disabled, children } = props;
  return (
    <button onClick={onClick} className={styles.button} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;