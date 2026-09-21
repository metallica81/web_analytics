import styles from '../styles/WrongAnswerModal.module.css';

interface WrongAnswerModalProps {
  remainingActions: number;
  onClose: () => void;
}

export function WrongAnswerModal({ remainingActions, onClose }: WrongAnswerModalProps) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.iconCircle}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        </div>
        <h3 className={styles.title}>Неправильный ответ</h3>
        <p className={styles.text}>
          Попробуйте ещё раз! Действий осталось: <strong>{remainingActions}</strong>
        </p>
        <button className={styles.button} onClick={onClose}>
          Попробовать снова
        </button>
      </div>
    </div>
  );
}
