import { useState } from "react";
import { Link } from "react-router-dom";
import { asset } from "../utils/asset";
import {
  HandHelping,
  Clock3,
  Handshake,
  Users,
  Briefcase,
  RotateCcw,
  Flag,
  Star,
} from "lucide-react";
import ShopModal from "../components/ShopModal";

const modules = [
  { id: 1, title: "Добро пожаловать" },
  { id: 2, title: "История и наследие" },
  { id: 3, title: "Корпоративная культура" },
  { id: 4, title: "Люди и структура" },
  { id: 5, title: "Бизнес и продукты" },
  { id: 6, title: "Инструменты и процессы" },
  { id: 7, title: "Финальный квест" },
];

const iconComponents = [
  HandHelping,
  Clock3,
  Handshake,
  Users,
  Briefcase,
  RotateCcw,
  Flag,
  Star,
];

export default function HomePage({ completedModules = [], moduleScores = {} }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);

  const totalScore = Object.values(moduleScores).reduce((sum, v) => sum + (v ?? 0), 0);

  return (
    <div className="relative min-h-screen bg-white text-dark font-sans overflow-hidden">
      {/* Водяной знак на фоне */}
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

      {/* Шапка */}
      <header className="relative z-10 flex items-center justify-between px-6 py-3 bg-[#f5f5f5]">
        {/* Кнопка Меню в стиле rgs */}
        <button
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

        {/* Логотип по центру, клик → главная */}
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

      {/* Выпадающее меню модулей */}
      {menuOpen && (
        <>
          {/* Оверлей на всю страницу — клик по нему закрывает меню */}
          <div
            className="fixed inset-0 z-20"
            onClick={() => setMenuOpen(false)}
          />

          {/* Само окно меню */}
          <div className="absolute left-6 top-16 z-30 w-72 space-y-2 rounded-lg border border-primary bg-white p-4 shadow-lg">
            <h2 className="mb-2 text-lg font-semibold text-primary">Модули</h2>
            {modules.map((mod) => (
              <Link
                key={mod.id}
                to={`/module/${mod.id}`}
                onClick={() => setMenuOpen(false)}  // закрыть меню при выборе
                className="block rounded border border-transparent px-4 py-2 text-sm text-dark transition hover:border-primary hover:bg-[#f3e9ec]"
              >
                Модуль {mod.id}: {mod.title}
              </Link>
            ))}
          </div>
        </>
      )}

      <main className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-6 pb-16 pt-10">
        {/* Центральный блок с картинкой модуля */}
          <section className="w-full">
            <div
              className="relative mx-auto max-w-6xl overflow-hidden"
              style={{
                // скошенные углы, как у RGS
                clipPath:
                  "polygon(18px 0, 100% 0, 100% calc(100% - 18px), calc(100% - 18px) 100%, 0 100%, 0 18px)",
              }}
            >
              {/* Картинка героя */}
              <img
                src={asset("hands.png")}
                alt="Командная работа"
                className="h-[360px] w-full object-cover"
              />

              {/* Лёгкий бордовый градиент для читаемого текста */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#990032]/40 via-[#990032]/10 to-transparent" />

              {/* Текстовый блок слева, как на RGS */}
              <div className="absolute inset-y-0 left-10 flex max-w-xl flex-col justify-center text-white">
                <p className="mb-2 text-sm font-medium tracking-[0.12em] uppercase text-white/80">
                  Курс адаптации
                </p>
                <h1 className="mb-4 text-4xl font-bold leading-tight">
                  Корпоративная культура Росгосстраха
                </h1>
                <p className="mb-6 text-base leading-relaxed text-white/85">
                  Узнайте о ценностях, истории и принципах работы компании, чтобы
                  уверенно стартовать в новой команде.
                </p>

                <div className="flex gap-3">
                  <Link
                    to="/module/1"
                    className="inline-block bg-primary px-7 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-md transition hover:bg-primary-hover active:bg-primary-active"
                  >
                    Начать обучение
                  </Link>
                </div>
              </div>
            </div>
          </section>

        {/* Нижняя панель с иконками модулей */}
        <section className="mt-10 flex w-full flex-col items-center gap-4">
          {totalScore > 0 && (
            <div className="flex items-center gap-2 rounded-full bg-primary/10 border border-primary/30 px-6 py-2 text-sm font-semibold text-primary">
                💰 Общий счёт за все модули: {totalScore}
            </div>
          )}
          <div className="flex items-center gap-6 rounded-[999px] bg-[#f5f5f5] px-10 py-4 shadow-sm">
            {modules.map((mod, index) => {
              const Icon = iconComponents[index];
              const isDone = completedModules.includes(mod.id);
              const maxCompleted = completedModules.length > 0 ? Math.max(...completedModules) : 0;
              const isAccessible = mod.id <= maxCompleted + 1;

              if (!isAccessible) {
                return (
                  <div key={mod.id} className="flex flex-col items-center gap-1 text-xs opacity-40 cursor-not-allowed">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-gray-100 text-gray-400">
                      {Icon && <Icon className="h-5 w-5" />}
                    </div>
                    <span className="text-[11px] text-gray-400">Модуль {mod.id}</span>
                  </div>
                );
              }

              return (
                <Link
                  key={mod.id}
                  to={`/module/${mod.id}`}
                  className="flex flex-col items-center gap-1 text-xs"
                >
                  <div
                    className={[
                      "flex h-10 w-10 items-center justify-center rounded-xl border transition",
                      isDone
                        ? "border-primary bg-primary text-white"
                        : "border-gray-300 bg-white text-gray-500 hover:border-primary-hover hover:text-primary-hover",
                    ].join(" ")}
                  >
                    {Icon && <Icon className="h-5 w-5" />}
                  </div>
                  <span className="text-[11px] text-gray-700">
                    Модуль {mod.id}
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      </main>

      {shopOpen && (
        <ShopModal onClose={() => setShopOpen(false)} totalScore={totalScore} />
      )}
    </div>
  );
}
