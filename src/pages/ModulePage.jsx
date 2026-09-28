// src/pages/ModulePage.jsx
import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { CardGameRoot } from "../components/CardGame";
import ShopModal from "../components/ShopModal";
import RoadmapTransitionSvg, { calcRoadmapDurationMs } from "../components/RoadmapTransitionSvg";
import { asset } from "../utils/asset";


// Для каждого модуля: название, файл с материалами и свой набор вопросов
const modules = [
  {
    id: 1,
    title: "Добро пожаловать",
    materials: asset("materials/module-1.docx"),
    questions: [
      {
        text: "Какова основная цель вводного модуля?",
        options: [
          "Познакомить с историей страхования",
          "Помочь новичку ориентироваться в компании и курсе",
          "Проверить знания нового сотрудника"
        ],
        correct: 1,
      },
      {
        text: "Что важно сделать в первые дни в компании?",
        options: [
          "Игнорировать коллег и сосредоточиться только на задачах",
          "Познакомиться с командой и руководителем",
          "Сразу требовать повышения"
        ],
        correct: 1,
      },
      {
        text: "К кому в первую очередь обратиться с вопросами по адаптации?",
        options: [
          "К случайному коллеге",
          "К HR/куратору адаптации",
          "Не обращаться ни к кому"
        ],
        correct: 1,
      },
      {
        text: "Что помогает быстрее влиться в коллектив?",
        options: [
          "Избегать общения с коллегами",
          "Участвовать в жизни команды и корпоративных мероприятиях",
          "Работать только удалённо"
        ],
        correct: 1,
      },
      {
        text: "Где можно найти информацию о внутренних правилах компании?",
        options: [
          "Только у руководителя",
          "Во внутреннем портале или у HR",
          "Нигде, нужно догадываться самому"
        ],
        correct: 1,
      },
      {
        text: "Что такое испытательный срок?",
        options: [
          "Период, когда сотрудник знакомится с компанией и демонстрирует свои навыки",
          "Время для отпуска",
          "Штрафной период за ошибки"
        ],
        correct: 0,
      },
    ],
  },
  {
    id: 2,
    title: "История и наследие",
    materials: asset("materials/module-2.docx"),
    questions: [
      {
        text: "Почему история компании важна для сотрудника?",
        options: [
          "Позволяет лучше понять ценности и решения компании",
          "Нужна только для экзаменов",
          "Не имеет значения в повседневной работе"
        ],
        correct: 0,
      },
      {
        text: "К какому году относится основание Росгосстраха?",
        options: ["1921", "2001", "2010"],
        correct: 0,
      },
      {
        text: "Что можно считать частью наследия компании?",
        options: [
          "Успешные практики и опыт работы с клиентами",
          "Только логотип",
          "Только внутренний портал"
        ],
        correct: 0,
      },
      {
        text: "Как давно Росгосстрах работает на рынке страхования?",
        options: [
          "Менее 10 лет",
          "Около 25 лет",
          "Более 100 лет"
        ],
        correct: 2,
      },
      {
        text: "Что отличает Росгосстрах от большинства конкурентов?",
        options: [
          "Самая низкая цена на все услуги",
          "Масштаб присутствия и многолетний опыт по всей стране",
          "Работа только в Москве"
        ],
        correct: 1,
      },
      {
        text: "Зачем новому сотруднику знать историю компании?",
        options: [
          "Чтобы рассказывать её клиентам для продажи",
          "Чтобы понимать, откуда берутся традиции и принципы работы",
          "Это не нужно — достаточно знать текущие продукты"
        ],
        correct: 1,
      },
    ],
  },
  {
    id: 3,
    title: "Корпоративная культура",
    materials: asset("materials/module-3.docx"),
    questions: [
      {
        text: "Что такое корпоративная культура?",
        options: [
          "Набор случайных традиций в офисе",
          "Система ценностей, норм и принципов компании",
          "Фирменный стиль и логотип"
        ],
        correct: 1,
      },
      {
        text: "Какое поведение соответствует ценностям клиенториентированности?",
        options: [
          "Игнорировать запрос клиента, если он сложный",
          "Искать решение, объяснять условия простым языком",
          "Перекладывать ответственность на коллег"
        ],
        correct: 1,
      },
      {
        text: "Почему важно следовать корпоративным ценностям?",
        options: [
          "Так проще избежать общения с клиентами",
          "Это помогает формировать доверие и устойчивую репутацию",
          "Это нужно только руководству"
        ],
        correct: 1,
      },
      {
        text: "Что из перечисленного является примером корпоративной ценности?",
        options: [
          "Ответственность перед клиентами и обществом",
          "Стремление скрывать ошибки",
          "Работа в интересах только своего отдела"
        ],
        correct: 0,
      },
      {
        text: "Как корпоративная культура влияет на новых сотрудников?",
        options: [
          "Никак не влияет",
          "Помогает быстрее адаптироваться и понять ожидания компании",
          "Мешает проявлять инициативу"
        ],
        correct: 1,
      },
      {
        text: "Что НЕ относится к проявлению корпоративной культуры?",
        options: [
          "Уважительное общение с коллегами",
          "Соблюдение дресс-кода и внутренних правил",
          "Игнорирование корпоративных мероприятий из личных предпочтений"
        ],
        correct: 2,
      },
    ],
  },
  {
    id: 4,
    title: "Люди и структура",
    materials: asset("materials/module-4.docx"),
    questions: [
      {
        text: "Где лучше всего смотреть актуальную организационную структуру?",
        options: [
          "В произвольном документе сотрудника",
          "На официальном внутреннем ресурсе компании",
          "В личных заметках"
        ],
        correct: 1,
      },
      {
        text: "К кому обратиться при вопросах по функционалу отдела?",
        options: [
          "К руководителю отдела или назначенному наставнику",
          "К любому сотруднику другой компании",
          "К друзьям вне работы"
        ],
        correct: 0,
      },
      {
        text: "Что важно понимать о структуре компании?",
        options: [
          "Только название своего отдела",
          "Ключевые блоки и как они взаимодействуют",
          "Это не имеет значения"
        ],
        correct: 1,
      },
      {
        text: "Что такое наставник в период адаптации?",
        options: [
          "Сотрудник, контролирующий каждый шаг новичка",
          "Опытный коллега, помогающий новому сотруднику освоиться",
          "Специалист только по техническим вопросам"
        ],
        correct: 1,
      },
      {
        text: "Как правильно выстраивать взаимодействие с другими отделами?",
        options: [
          "Обращаться только через руководство",
          "Выстраивать рабочие контакты напрямую с нужными коллегами",
          "Избегать любых контактов с другими отделами"
        ],
        correct: 1,
      },
      {
        text: "Для чего нужна организационная структура?",
        options: [
          "Чтобы понять, кто за что отвечает и к кому обращаться",
          "Только для HR-отдела",
          "Для украшения корпоративного портала"
        ],
        correct: 0,
      },
    ],
  },
  {
    id: 5,
    title: "Бизнес и продукты",
    materials: asset("materials/module-5.docx"),
    questions: [
      {
        text: "Что должен знать сотрудник о продуктах компании?",
        options: [
          "Только название одного продукта",
          "Ключевые характеристики и кому продукт подходит",
          "Ничего — это задача маркетинга"
        ],
        correct: 1,
      },
      {
        text: "Почему важно понимать потребности клиента?",
        options: [
          "Чтобы предложить наиболее подходящий продукт",
          "Чтобы продать как можно больше любых продуктов",
          "Чтобы отказаться от клиента"
        ],
        correct: 0,
      },
      {
        text: "Что означает «ответственные продажи»?",
        options: [
          "Предлагать продукт, не разбираясь в нём",
          "Честно объяснять условия и риски клиенту",
          "Скрывать важные детали договора"
        ],
        correct: 1,
      },
      {
        text: "Что делать, если клиент сомневается в выборе продукта?",
        options: [
          "Давить на клиента, чтобы он купил сразу",
          "Выяснить его потребности и подобрать наиболее подходящий вариант",
          "Отказать в консультации"
        ],
        correct: 1,
      },
      {
        text: "Какой страховой продукт является обязательным для автовладельцев в России?",
        options: [
          "КАСКО",
          "ОСАГО",
          "Страхование жизни"
        ],
        correct: 1,
      },
      {
        text: "Что помогает сотруднику качественно консультировать клиентов?",
        options: [
          "Знание только цены продукта",
          "Глубокое понимание условий, преимуществ и ограничений продукта",
          "Умение быстро завершать разговор"
        ],
        correct: 1,
      },
    ],
  },
  {
    id: 6,
    title: "Инструменты и процессы",
    materials: asset("materials/module-6.docx"),
    questions: [
      {
        text: "Что важно при работе с внутренними ИТ-системами?",
        options: [
          "Передавать свой логин и пароль коллегам",
          "Соблюдать регламенты безопасности и инструкции",
          "Игнорировать сообщения об ошибках"
        ],
        correct: 1,
      },
      {
        text: "Для чего нужны регламенты и инструкции?",
        options: [
          "Чтобы усложнить работу",
          "Чтобы процессы были прозрачными и повторяемыми",
          "Чтобы сотрудники меньше общались"
        ],
        correct: 1,
      },
      {
        text: "Как лучше осваивать новые инструменты?",
        options: [
          "Избегать их использования",
          "Проходить обучение, пользоваться инструкциями и задавать вопросы",
          "Просить других делать работу за вас"
        ],
        correct: 1,
      },
      {
        text: "Что следует сделать при обнаружении сбоя в ИТ-системе?",
        options: [
          "Продолжить работу и не сообщать об ошибке",
          "Сообщить в техподдержку и зафиксировать проблему",
          "Самостоятельно изменить настройки системы"
        ],
        correct: 1,
      },
      {
        text: "Почему важно соблюдать информационную безопасность?",
        options: [
          "Это формальность, которую можно игнорировать",
          "Чтобы защитить данные клиентов и компании от утечек",
          "Только чтобы не получить штраф"
        ],
        correct: 1,
      },
      {
        text: "Что такое электронный документооборот?",
        options: [
          "Обмен документами только через курьера",
          "Система обработки и хранения документов в электронном виде",
          "Личная переписка сотрудников по email"
        ],
        correct: 1,
      },
    ],
  },
  {
    id: 7,
    title: "Финальный квест",
    materials: asset("materials/module-7.docx"),
    questions: [
      {
        text: "Какова цель финального квеста?",
        options: [
          "Развлечь сотрудников без пользы",
          "Проверить и закрепить знания из всех модулей",
          "Заменить реальные рабочие задачи"
        ],
        correct: 1,
      },
      {
        text: "Как лучше выполнять задания квеста?",
        options: [
          "В одиночку, не обсуждая ничего с коллегами",
          "Совместно, опираясь на знания по курсу",
          "Игнорировать правила"
        ],
        correct: 1,
      },
      {
        text: "Что делать после прохождения финального квеста?",
        options: [
          "Забыть всё, что было на курсе",
          "Использовать полученные знания в ежедневной работе",
          "Менять место работы"
        ],
        correct: 1,
      },
      {
        text: "Что свидетельствует об успешном завершении адаптации?",
        options: [
          "Сотрудник знает коллег, понимает задачи и уверенно работает самостоятельно",
          "Сотрудник прошёл все тесты с первой попытки",
          "Сотрудник провёл в компании ровно 3 месяца"
        ],
        correct: 0,
      },
      {
        text: "Какой из навыков наиболее важен для долгосрочного успеха в компании?",
        options: [
          "Умение избегать сложных задач",
          "Готовность учиться и развиваться вместе с компанией",
          "Знание всех внутренних процессов с первого дня"
        ],
        correct: 1,
      },
      {
        text: "Как лучше всего поддерживать знания после окончания курса?",
        options: [
          "Перечитывать материалы только при проверках",
          "Применять знания на практике и регулярно обновлять их",
          "Знания больше не нужны после прохождения обучения"
        ],
        correct: 1,
      },
    ],
  },
];


export default function ModulePage({ completedModules, setCompletedModules, moduleScores, setModuleScores }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const moduleId = Number(id);
  const currentModule = modules.find((m) => m.id === moduleId);

  const questions = currentModule ? currentModule.questions : [];

  // --- меню "Меню / модули" в шапке ---
  const [menuOpen, setMenuOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const menuRef = useRef(null);
  const menuButtonRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        menuOpen &&
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(e.target)
      ) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const completed = completedModules.includes(moduleId);
  const [gameFinished, setGameFinished] = useState(completed);
  const [roadmapTransition, setRoadmapTransition] = useState(null);
  const [showRoadmapOverlay, setShowRoadmapOverlay] = useState(false);
  const [roadmapVisible, setRoadmapVisible] = useState(false);
  const [displayBalance, setDisplayBalance] = useState(0);
  const [flipsInfo, setFlipsInfo] = useState({ used: 0, allowed: 3 });
  const [gameStarted, setGameStarted] = useState(false);
  const quizInnerRef = useRef(null);
  const quizSectionRef = useRef(null);
  const prevHeightRef = useRef(null);

  const previousScore = Object.entries(moduleScores).reduce((sum, [key, val]) => {
    return parseInt(key) !== moduleId ? sum + (val ?? 0) : sum;
  }, 0);

  useEffect(() => {
    setDisplayBalance(previousScore);
    setFlipsInfo({ used: 0, allowed: 3 });
    setGameStarted(false);
  }, [previousScore]);

  const markCompleted = () => {
    setCompletedModules((prev) =>
      prev.includes(moduleId) ? prev : [...prev, moduleId]
    );
  };

  useEffect(() => {
    const raw = sessionStorage.getItem("roadmapTransition");
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw);
      const fromId = Number(parsed?.fromId);
      const toId = Number(parsed?.toId);

      // Показываем мини-маршрут только на модуле, который пришёл "следующим".
      if (Number.isFinite(fromId) && Number.isFinite(toId) && toId === moduleId) {
        setRoadmapTransition({ fromId, toId });
      }
    } catch {
      // ignore invalid session data
    } finally {
      sessionStorage.removeItem("roadmapTransition");
    }
  }, [moduleId]);

  // Показываем мини-маршрут ровно на длительность анимации.
  useEffect(() => {
    if (!roadmapTransition) return;

    const { fromId, toId } = roadmapTransition;
    const animDuration = calcRoadmapDurationMs(fromId, toId);
    const fadeMs = 500;

    setRoadmapVisible(false);
    setShowRoadmapOverlay(true);

    // Fade-in
    const rafId = requestAnimationFrame(() => {
      requestAnimationFrame(() => setRoadmapVisible(true));
    });

    // Fade-out: за fadeMs до конца
    const tFade = setTimeout(() => setRoadmapVisible(false), animDuration);
    const tHide = setTimeout(() => {
      setShowRoadmapOverlay(false);
      setRoadmapTransition(null);
    }, animDuration + fadeMs);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(tFade);
      clearTimeout(tHide);
    };
  }, [roadmapTransition]);

  // Плавная анимация высоты секции при любом изменении контента
  useEffect(() => {
    const section = quizSectionRef.current;
    const inner = quizInnerRef.current;
    if (!section || !inner) return;

    const ro = new ResizeObserver(() => {
      const newH = inner.offsetHeight;
      const oldH = prevHeightRef.current;

      if (oldH !== null && oldH !== newH) {
        // Зафиксировать старую высоту, убрать transition
        section.style.transition = "none";
        section.style.height = oldH + "px";
        section.style.overflow = "hidden";

        // В следующем кадре — запустить transition к новой высоте
        requestAnimationFrame(() => {
          section.style.transition = "height 500ms ease-in-out";
          section.style.height = newH + "px";
        });
      }

      prevHeightRef.current = newH;
    });

    const onEnd = () => {
      section.style.height = "auto";
      section.style.overflow = "visible";
      prevHeightRef.current = inner.offsetHeight;
    };
    section.addEventListener("transitionend", onEnd);

    // Начальное значение
    prevHeightRef.current = inner.offsetHeight;
    ro.observe(inner);

    return () => {
      ro.disconnect();
      section.removeEventListener("transitionend", onEnd);
    };
  }, []);

  if (!currentModule) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-accent text-dark">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">Модуль не найден</h1>
          <Link
            to="/"
            className="inline-block bg-primary hover:bg-primary-hover active:bg-primary-active text-white px-5 py-2 rounded-md transition"
          >
            На главную
          </Link>
        </div>
      </div>
    );
  }

  const isLast = moduleId === modules.length;

  const goToNextModule = () => {
    if (isLast) {
      navigate("/");
      return;
    }
    sessionStorage.setItem(
      "roadmapTransition",
      JSON.stringify({ fromId: moduleId, toId: moduleId + 1 })
    );
    navigate(`/module/${moduleId + 1}`);
  };

  return (
    <div className="relative min-h-screen bg-accent text-dark font-sans overflow-hidden">
      {/* водяной знак */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: `url('${asset("watermark.svg")}')`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "110%",
          opacity: 0.1,
        }}
      />
      {/* шапка */}
      <header className="relative z-20 bg-[#f5f5f5] shadow-sm py-3 px-6 flex items-center justify-between">
        {/* Кнопка Меню — как на главной */}
        <button
          ref={menuButtonRef}
          onClick={() => setMenuOpen((prev) => !prev)}
          className="flex items-center gap-2 text-[#666] hover:bg-gray-100 px-2 py-1 rounded transition"
          aria-label="Открыть меню"
        >
          <div className="flex flex-col justify-center gap-[4px]">
            <span className="block w-6 h-[3px] bg-[#666] rounded"></span>
            <span className="block w-6 h-[3px] bg-[#666] rounded"></span>
            <span className="block w-6 h-[3px] bg-[#666] rounded"></span>
          </div>
          <span className="text-base font-bold text-[#666]">Меню</span>
        </button>

        <Link to="/">
          <img
            src={asset("logo.png")}
            alt="РОСГОССТРАХ"
            className="h-24 object-contain mx-auto"
          />
        </Link>

        {/* Кнопка Лавка */}
        <button
          onClick={() => setShopOpen(true)}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary-hover transition"
        >
          🛍️ Лавка
        </button>
      </header>

      {/* выпадающее меню модулей */}
      {menuOpen && (
        <div className="fixed inset-0 z-10 flex justify-end">
          <div className="flex-1" onClick={() => setMenuOpen(false)} />
          <div
            ref={menuRef}
            className="w-80 max-w-full bg-white border-l border-primary shadow-xl p-4 space-y-3"
          >
            <h2 className="text-lg font-semibold text-primary mb-2">
              Модули курса
            </h2>
            {modules.map((mod) => (
              <button
                key={mod.id}
                onClick={() => {
                  setMenuOpen(false);
                  navigate(`/module/${mod.id}`);
                }}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition border ${
                  mod.id === moduleId
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-dark border-transparent hover:bg-accent hover:border-primary"
                }`}
              >
                Модуль {mod.id}: {mod.title}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* основное содержимое */}
      <main className="relative z-10 max-w-5xl mx-auto px-6 py-10 space-y-8">
        {/* заголовок модуля + навигация */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <div className="text-xs uppercase tracking-wide text-gray-500">
                Модуль {moduleId}
              </div>
              {completed && (
                <span className="inline-flex items-center rounded-full bg-green-50 border border-green-400 px-3 py-0.5 text-[11px] font-semibold text-green-700">
                  Модуль пройден
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-dark mt-1">
              {currentModule.title}
            </h1>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 text-sm border border-gray-300 rounded-md bg-white/80 hover:bg-gray-100 transition"
            >
              ← На главную
            </button>

            <button
              onClick={goToNextModule}
              disabled={!gameFinished}
              className={`px-4 py-2 text-sm rounded-md shadow-sm transition text-white ${
                gameFinished
                  ? "bg-primary hover:bg-primary-hover active:bg-primary-active cursor-pointer"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              {isLast ? "Завершить обучение" : "Следующий модуль →"}
            </button>
          </div>
        </div>

        {/* блок с видеоплеером и кнопками */}
        <section className="bg-white/90 rounded-3xl shadow-md overflow-hidden">
          {/* Видеоплеер */}
          {moduleId === 1 ? (
            <div className="relative w-full bg-black">
              <iframe
                src="https://vkvideo.ru/video_ext.php?oid=-209373179&id=456239019&hd=2"
                width="100%"
                className="w-full h-64 sm:h-80"
                allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 bg-gray-100">
              <span className="text-xl font-semibold text-gray-500">Видеоматериалы модуля</span>
            </div>
          )}

          <div className="px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-700">
              Просмотрите видео модуля, а затем пройдите тест для
              закрепления материала.
            </p>
            <div className="flex flex-wrap gap-3">
              {currentModule.materials ? (
                <a
                  href={currentModule.materials}
                  download
                  className="px-5 py-2 text-sm rounded-md border border-primary text-primary bg-white hover:bg-accent transition"
                >
                  Скачать материалы
                </a>
              ) : (
                <span className="text-xs text-gray-500">
                  Материалы для скачивания пока недоступны
                </span>
              )}
              <a
                href="#quiz"
                className="px-5 py-2 text-sm rounded-md bg-primary hover:bg-primary-hover active:bg-primary-active text-white transition"
              >
                Пройти тест
              </a>
            </div>
          </div>
        </section>


        {/* тест — карточная игра для всех модулей */}
        <section
          id="quiz"
          ref={quizSectionRef}
          className="bg-white/95 shadow-md rounded-2xl p-6 border border-gray-100"
          style={{ minHeight: (!completed && gameStarted && !showRoadmapOverlay) ? "auto" : 534 }}
        >
          {/* Шапка со счётом — всегда видна */}
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
            <div className="text-base font-semibold text-dark whitespace-nowrap">
              СЧЁТ:<span className="text-primary ml-1.5">{displayBalance}</span> 💰
            </div>
            <div className="text-sm text-gray-500 whitespace-nowrap">
              Действий осталось
              <span className="font-semibold text-primary ml-1.5">
                {flipsInfo.allowed - flipsInfo.used}/{flipsInfo.allowed}
              </span>
            </div>
          </div>

          <div ref={quizInnerRef}>
          {showRoadmapOverlay && roadmapTransition ? (
            <div
              className="text-center transition-opacity duration-500 ease-in-out"
              style={{ padding: "60px 40px", opacity: roadmapVisible ? 1 : 0 }}
            >
              <div className="w-full">
                <RoadmapTransitionSvg
                  fromId={roadmapTransition.fromId}
                  toId={roadmapTransition.toId}
                  moduleTitles={modules.map((m) => m.title)}
                />
              </div>
            </div>
          ) : completed ? (
            <div className="flex flex-col items-center justify-center gap-6 py-16 text-center" style={{ minHeight: 400 }}>
              <div className="text-8xl">🏆</div>
              <h3 className="text-2xl font-bold text-dark">Модуль уже пройден</h3>
              <p className="text-sm text-gray-500 max-w-sm">
                Вы уже прошли этот модуль. Переходите к следующему или вернитесь на главную.
              </p>
              <div className="flex gap-3 mt-2">
                <button
                  onClick={() => navigate("/")}
                  className="px-5 py-2 text-sm border border-gray-300 rounded-md bg-white hover:bg-gray-100 transition"
                >
                  ← На главную
                </button>
                {!isLast && (
                  <button
                    onClick={goToNextModule}
                    className="px-5 py-2 text-sm rounded-md bg-primary text-white hover:bg-primary-hover transition"
                  >
                    Следующий модуль →
                  </button>
                )}
              </div>
            </div>
          ) : (
            <CardGameRoot
              key={moduleId}
              questions={questions.map((q) => ({
                text: q.text,
                answers: q.options.map((opt, i) => ({
                  text: opt,
                  isCorrect: i === q.correct,
                })),
              }))}
              coinCount={3}
              flipsAllowed={3}
              coinReward={20}
              questionReward={50}
              initialBalance={previousScore}
              onBalanceChange={(newBalance) => {
                setDisplayBalance(newBalance);
                const sessionEarnings = newBalance - previousScore;
                setModuleScores((prev) => ({
                  ...prev,
                  [moduleId]: Math.max(prev[moduleId] ?? 0, sessionEarnings),
                }));
              }}
              onFlipsChange={(used, allowed) => {
                setFlipsInfo({ used, allowed });
              }}
              onGameStart={() => setGameStarted(true)}
              onComplete={() => {
                setGameFinished(true);
                markCompleted();
              }}
            />
          )}
          </div>
        </section>
      </main>

      {shopOpen && (
        <ShopModal
          onClose={() => setShopOpen(false)}
          totalScore={Object.values(moduleScores).reduce((sum, v) => sum + (v ?? 0), 0)}
        />
      )}
    </div>
  );
}
