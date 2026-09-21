import { CardData } from '../types';
import styles from '../styles/Card.module.css';

interface CardProps {
  card: CardData;
  onFlip: (id: number) => void;
}

export function Card({ card, onFlip }: CardProps) {
  const handleClick = () => {
    if (!card.revealed) {
      onFlip(card.id);
    }
  };

  const classNames = [
    styles.card,
    card.revealed ? styles.revealed : '',
    card.revealed && card.type === 'coin' ? styles.coin : '',
    card.revealed && card.type === 'question' ? styles.question : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames} onClick={handleClick}>
      <div className={styles.cardContent}>
        {card.revealed && card.type === 'coin' && (
          <span className={styles.coinIcon}>💰</span>
        )}
        {card.revealed && card.type === 'question' && (
          <span className={styles.questionIcon}>❓</span>
        )}
      </div>
    </div>
  );
}
