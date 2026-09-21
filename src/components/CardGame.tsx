import { useState, useCallback } from 'react';
import { Question, CardData, GameResult } from '../types';
import { GameBoard } from './GameBoard';
import { QuestionPanel } from './QuestionPanel';
import styles from '../styles/CardGame.module.css';

interface CardGameProps {
  questions: Question[];
  coinCount?: number;
  flipsAllowed?: number;
  coinReward?: number;
  questionReward?: number;
  initialBalance?: number;
  onComplete?: (result: GameResult) => void;
  onBalanceChange?: (balance: number) => void;
  onFlipsChange?: (flipsUsed: number, flipsAllowed: number) => void;
  onGameStart?: () => void;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function buildCards(coinCount: number, questionCount: number): CardData[] {
  const types: CardData[] = [];
  for (let i = 0; i < coinCount; i++) {
    types.push({ id: i, type: 'coin', revealed: false });
  }
  for (let i = 0; i < questionCount; i++) {
    types.push({ id: coinCount + i, type: 'question', revealed: false });
  }
  return shuffleArray(types);
}

export function CardGameRoot({
  questions,
  coinCount = 3,
  flipsAllowed = 3,
  coinReward = 20,
  questionReward = 50,
  initialBalance = 0,
  onComplete,
  onBalanceChange,
  onFlipsChange,
  onGameStart,
}: CardGameProps) {
  const questionCount = questions.length;
  const totalCards = coinCount + questionCount;

  const [cards, setCards] = useState<CardData[]>(() =>
    buildCards(coinCount, questionCount)
  );
  const [balance, setBalance] = useState(initialBalance);
  const [started, setStarted] = useState(false);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [activeQuestion, setActiveQuestion] = useState<boolean>(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [flipsUsed, setFlipsUsed] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const updateBalance = useCallback(
    (newBalance: number) => {
      setBalance(newBalance);
      onBalanceChange?.(newBalance);
    },
    [onBalanceChange]
  );

  const checkCompletion = useCallback(
    (newBalance: number, newCorrectAnswers: number, newFlipsUsed: number) => {
      if (newFlipsUsed >= flipsAllowed) {
        setGameOver(true);
        onComplete?.({
          totalBalance: newBalance,
          correctAnswers: newCorrectAnswers,
          totalQuestions: questionCount,
        });
      }
    },
    [onComplete, questionCount, flipsAllowed]
  );

  const handleFlipCard = useCallback(
    (id: number) => {
      if (activeQuestion || gameOver) return;

      const newFlipsUsed = flipsUsed + 1;
      setFlipsUsed(newFlipsUsed);
      onFlipsChange?.(newFlipsUsed, flipsAllowed);

      setCards((prev) => {
        const updated = prev.map((c) =>
          c.id === id ? { ...c, revealed: true } : c
        );
        const flipped = updated.find((c) => c.id === id)!;

        if (flipped.type === 'coin') {
          const newBalance = balance + coinReward;
          updateBalance(newBalance);
          checkCompletion(newBalance, correctAnswers, newFlipsUsed);
        } else {
          setActiveQuestion(true);
        }

        return updated;
      });
    },
    [
      activeQuestion,
      gameOver,
      flipsUsed,
      flipsAllowed,
      balance,
      coinReward,
      correctAnswers,
      updateBalance,
      checkCompletion,
      onFlipsChange,
    ]
  );

  const handleCorrectAnswer = useCallback(() => {
    const newBalance = balance + questionReward;
    const newCorrectAnswers = correctAnswers + 1;
    updateBalance(newBalance);
    setCorrectAnswers(newCorrectAnswers);
    setCurrentQuestionIdx((prev) => prev + 1);
    setActiveQuestion(false);
    checkCompletion(newBalance, newCorrectAnswers, flipsUsed);
  }, [
    balance,
    questionReward,
    correctAnswers,
    flipsUsed,
    updateBalance,
    checkCompletion,
  ]);

  const showQuestion = activeQuestion && currentQuestionIdx < questions.length;

  return (
    <div className={styles.container}>
      <div className={`${styles.questionWrapper} ${showQuestion ? styles.questionWrapperOpen : ''}`}>
        {showQuestion && (
          <QuestionPanel
            key={currentQuestionIdx}
            question={questions[currentQuestionIdx]}
            questionIndex={currentQuestionIdx}
            totalQuestions={questionCount}
            remainingActions={flipsAllowed - flipsUsed}
            onCorrectAnswer={handleCorrectAnswer}
          />
        )}
      </div>

      <GameBoard
        cards={cards}
        balance={balance}
        flipsUsed={flipsUsed}
        flipsAllowed={flipsAllowed}
        started={started}
        onStart={() => { setStarted(true); onGameStart?.(); }}
        onFlipCard={handleFlipCard}
      />
    </div>
  );
}
