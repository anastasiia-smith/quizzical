import styles from './Button.module.css';

export default function Button({ onClick, className, children }) {
  return (
    <button onClick={onClick} className={styles.button}>
      {children}
    </button>
  );
}
