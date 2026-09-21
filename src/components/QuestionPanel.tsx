import { useState } from 'react';
import { Question } from '../types';
import { WrongAnswerModal } from './WrongAnswerModal';
import styles from '../styles/QuestionPanel.module.css';

interface QuestionPanelProps {
  question: Question;
  questionIndex: number;
  totalQuestions: number;
  remainingActions: number;
  onCorrectAnswer: () => void;
}

export function QuestionPanel({
  question,
  questionIndex,
  totalQuestions,
  remainingActions,
  onCorrectAnswer,
}: QuestionPanelProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showReward, setShowReward] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [showWrongModal, setShowWrongModal] = useState(false);

  const handleCheck = () => {
    if (selectedIndex === null) {
      return;
    }

    if (question.answers[selectedIndex].isCorrect) {
      setShowReward(true);
      setTimeout(() => setIsExiting(true), 1000);
      setTimeout(() => {
        setShowReward(false);
        setSelectedIndex(null);
        setIsExiting(false);
        onCorrectAnswer();
      }, 1500);
    } else {
      setShowWrongModal(true);
    }
  };

  let row = 0;

  return (
    <div className={`${styles.questionPanel} ${isExiting ? styles.exiting : ''}`}>
      <div className={styles.rowAppear} style={{ animationDelay: `${row++ * 200}ms` }}>
        <div className={styles.panelTitle}>Тест по модулю</div>
      </div>

      <div className={styles.questionSection}>
        <div className={styles.rowAppear} style={{ animationDelay: `${row++ * 200}ms` }}>
          <div className={styles.questionText}>
            {questionIndex + 1}/{totalQuestions}. {question.text}
          </div>
        </div>

        {question.answers.map((answer, i) => (
          <div key={i} className={styles.rowAppear} style={{ animationDelay: `${row++ * 200}ms` }}>
            <button
              className={`${styles.answerOption} ${selectedIndex === i ? styles.selected : ''}`}
              onClick={() => setSelectedIndex(i)}
            >
              {answer.text}
            </button>
          </div>
        ))}
      </div>

      <div className={styles.rowAppear} style={{ animationDelay: `${row++ * 200}ms` }}>
        <button className={styles.checkButton} onClick={handleCheck}>
          Проверить
        </button>
      </div>

      {showReward && (
        <div className={styles.rewardMessage}>
          ✓ Правильно! Монеты добавлены на ваш счёт
        </div>
      )}

      {showWrongModal && (
        <WrongAnswerModal
          remainingActions={remainingActions}
          onClose={() => setShowWrongModal(false)}
        />
      )}
    </div>
  );
}
