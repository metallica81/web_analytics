import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'

// Имя репозитория: сайт публикуется на https://<user>.github.io/web_analytics/
const base = '/web_analytics/'

// GitHub Pages не умеет серверных редиректов, поэтому для клиентского
// роутинга кладём копию index.html как 404.html — Pages отдаёт её на
// любой неизвестный путь, и React Router разбирает адрес уже сам.
function spaFallback() {
  let outDir = 'dist'
  return {
    name: 'spa-fallback-404',
    apply: 'build',
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir)
    },
    closeBundle() {
      const index = path.join(outDir, 'index.html')
      if (fs.existsSync(index)) {
        fs.copyFileSync(index, path.join(outDir, '404.html'))
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [react(), spaFallback()],
})
