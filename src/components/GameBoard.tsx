import { CardData } from '../types';
import { Card } from './Card';
import { StartScreen } from './StartScreen';
import styles from '../styles/GameBoard.module.css';

interface GameBoardProps {
  cards: CardData[];
  balance: number;
  flipsUsed: number;
  flipsAllowed: number;
  started: boolean;
  onStart: () => void;
  onFlipCard: (id: number) => void;
}

export function GameBoard({
  cards,
  balance,
  flipsUsed,
  flipsAllowed,
  started,
  onStart,
  onFlipCard,
}: GameBoardProps) {
  return (
    <div className={styles.gameBoard}>
      {!started ? (
        <StartScreen onStart={onStart} />
      ) : (
        <div className={styles.cardsGrid}>
          {cards.map((card, idx) => (
            <div
              key={card.id}
              className={styles.cardAppear}
              style={{ animationDelay: `${Math.floor(idx / 3) * 200}ms` }}
            >
              <Card card={card} onFlip={onFlipCard} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
