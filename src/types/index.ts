export interface Answer {
  text: string;
  isCorrect: boolean;
}

export interface Question {
  text: string;
  answers: Answer[];
}

export interface GameConfig {
  container: HTMLElement;
  questions: Question[];
  coinCount?: number;
  coinReward?: number;
  questionReward?: number;
  onComplete?: (result: GameResult) => void;
  onBalanceChange?: (balance: number) => void;
}

export interface GameResult {
  totalBalance: number;
  correctAnswers: number;
  totalQuestions: number;
}

export type CardType = 'coin' | 'question';

export interface CardData {
  id: number;
  type: CardType;
  revealed: boolean;
}
