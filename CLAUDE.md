# CLAUDE.md — Описание проекта

## Что это за проект

Учебный сайт адаптации для новых сотрудников **Росгосстраха**. Интерактивный курс из 7 модулей с видео, тестами и карточной игрой.

## Стек

- **React 19** + **Vite 7**
- **React Router DOM v7** — клиентский роутинг
- **Tailwind CSS v3** — стилизация (кастомная палитра, шрифт Montserrat)
- **CSS Modules** — для компонентов карточной игры
- **lucide-react** — иконки
- TypeScript только для типов (`src/types/`) и компонентов игры; страницы на JSX

## Структура проекта

```
src/
├── App.jsx                  # Роутер: / → HomePage, /module/:id → ModulePage
├── main.jsx                 # Точка входа, BrowserRouter
├── index.css                # Глобальные стили + импорт Montserrat
├── App.css                  # Минимальные глобальные стили
│
├── pages/
│   ├── HomePage.jsx         # Главная: шапка, hero-блок, нижняя панель модулей
│   └── ModulePage.jsx       # Страница модуля: видео, материалы, тест/игра
│
├── components/
│   ├── CardGame.tsx         # Корневой компонент карточной игры (CardGameRoot)
│   ├── GameBoard.tsx        # Игровое поле с картами
│   ├── Card.tsx             # Отдельная карта (монета / вопрос)
│   ├── QuestionPanel.tsx    # Панель с вопросом и вариантами ответов
│   └── StartScreen.tsx      # Экран запуска игры
│
├── styles/                  # CSS Modules для компонентов игры
│   ├── CardGame.module.css
│   ├── GameBoard.module.css
│   ├── Card.module.css
│   ├── QuestionPanel.module.css
│   └── StartScreen.module.css
│
└── types/
    └── index.ts             # Интерфейсы: Answer, Question, GameConfig, GameResult, CardData, CardType

public/
├── logo.png, watermark.png  # Брендинг Росгосстраха
├── hands.png                # Hero-изображение на главной
├── menu-icon.png            # Иконка бургер-меню
├── materials/               # .docx файлы для скачивания (module-1.docx … module-7.docx)
└── videos/                  # Видео-файлы (module-1.mp4 … module-7.mp4)
```

## Маршруты

| Путь | Компонент | Описание |
|------|-----------|----------|
| `/` | `HomePage` | Главная с hero и навигацией по модулям |
| `/module/:id` | `ModulePage` | Страница конкретного модуля (id = 1–7) |

## Модули курса

| ID | Тема |
|----|------|
| 1 | Добро пожаловать *(карточная игра вместо обычного теста)* |
| 2 | История и наследие |
| 3 | Корпоративная культура |
| 4 | Люди и структура |
| 5 | Бизнес и продукты |
| 6 | Инструменты и процессы |
| 7 | Финальный квест |

## Особенности

- **Модуль 1** использует карточную игру (`CardGameRoot`) вместо стандартного теста `QuizSection`.
- **Прогресс** хранится в `localStorage` (ключ `completedModules` — массив пройденных id).
- **Цветовая палитра** (Tailwind): `primary` `#b70037`, `accent` `#f5f5f5`, `dark` `#1a1a1a`.
- Каждый модуль имеет свой набор вопросов, захардкоженных в `ModulePage.jsx`.

## Команды

```bash
npm run dev      # Запустить dev-сервер
npm run build    # Сборка в dist/
npm run preview  # Превью сборки
npm run lint     # ESLint
```