import { X } from "lucide-react";

interface ShopItem {
  id: number;
  name: string;
  description: string;
  price: number;
  emoji: string;
}

const shopItems: ShopItem[] = [
  {
    id: 1,
    name: "Набор наклеек",
    description: "Коллекционный набор Росгосстраха",
    price: 100,
    emoji: "🩹",
  },
  {
    id: 2,
    name: "Кружка",
    description: "Фирменная кружка с логотипом",
    price: 300,
    emoji: "☕",
  },
  {
    id: 3,
    name: "Футболка",
    description: "Брендированная футболка Росгосстраха",
    price: 500,
    emoji: "👕",
  },
  {
    id: 4,
    name: "Свитшот",
    description: "Фирменный свитшот с вышивкой",
    price: 600,
    emoji: "🧥",
  },
  {
    id: 5,
    name: "Сертификат на страховку",
    description: "Сертификат на приобретение страховой продукции",
    price: 800,
    emoji: "📋",
  },
];

interface ShopModalProps {
  onClose: () => void;
  totalScore?: number;
}

export default function ShopModal({ onClose, totalScore = 0 }: ShopModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Шапка модального окна */}
        <div className="flex items-center justify-between px-8 py-5 bg-primary text-white">
          <div>
            <h2 className="text-2xl font-bold tracking-wide">🛍️ Лавка</h2>
            <p className="text-sm text-white/80 mt-0.5">Обменяйте баллы на подарки</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5">
              <span className="text-lg">💰</span>
              <span className="font-bold text-lg">{totalScore}</span>
              <span className="text-sm text-white/80">баллов</span>
            </div>
            <button
              onClick={onClose}
              className="flex items-center justify-center w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 transition"
              aria-label="Закрыть"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Сетка товаров */}
        <div className="p-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {shopItems.map((item) => {
              const canAfford = totalScore >= item.price;
              return (
                <div
                  key={item.id}
                  className={[
                    "flex flex-col items-center rounded-xl border-2 p-4 transition group",
                    canAfford
                      ? "border-gray-200 hover:border-primary hover:shadow-md cursor-pointer"
                      : "border-gray-100 opacity-50 cursor-not-allowed",
                  ].join(" ")}
                >
                  {/* Картинка / эмодзи */}
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#f3e9ec] text-4xl mb-3 group-hover:scale-110 transition-transform">
                    {item.emoji}
                  </div>

                  {/* Название */}
                  <span className="text-sm font-semibold text-dark text-center leading-tight mb-1">
                    {item.name}
                  </span>

                  {/* Описание */}
                  <span className="text-[11px] text-gray-400 text-center leading-tight mb-3 flex-1">
                    {item.description}
                  </span>

                  {/* Цена */}
                  <div
                    className={[
                      "flex items-center gap-1 rounded-full px-3 py-1 text-sm font-bold",
                      canAfford
                        ? "bg-primary/10 text-primary"
                        : "bg-gray-100 text-gray-400",
                    ].join(" ")}
                  >
                    <span>💰</span>
                    <span>{item.price}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Подвал */}
        <div className="px-8 pb-6 text-center text-xs text-gray-400">
          Для обмена баллов обратитесь к HR-менеджеру
        </div>
      </div>
    </div>
  );
}
