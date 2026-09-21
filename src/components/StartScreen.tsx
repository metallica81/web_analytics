import styles from '../styles/StartScreen.module.css';

interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className={styles.startSection}>
      <h2 className={styles.title}>Добро пожаловать в игру!</h2>
      <p className={styles.description}>
        Просмотрите видео модуля, а затем пройдите тест для закрепления
        материала.
        <br />
        Переворачивайте карточки, отвечайте на вопросы и зарабатывайте монеты!
      </p>
      <button className={styles.startButton} onClick={onStart}>
        Пройти тест
      </button>
    </div>
  );
}
