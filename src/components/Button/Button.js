import styles from './Button.module.css';

export default function Button({ onClick, className, disabled, children }) {
  return (
    <button onClick={onClick} className={styles.button} disabled={disabled}>
      {children}
    </button>
  );
}
