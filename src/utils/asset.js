// Путь к файлу из public/ с учётом базового пути сборки.
// На GitHub Pages сайт живёт в подпапке /web_analytics/, поэтому
// абсолютные пути вида "/logo.png" там не работают.
export const asset = (path) =>
  `${import.meta.env.BASE_URL}${String(path).replace(/^\//, "")}`;
