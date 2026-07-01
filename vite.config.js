import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base = '/ninja-turtle-pizza/' per GitHub Pages (project site),
// '/' per Vercel o hosting su dominio dedicato.
const base = process.env.DEPLOY_TARGET === 'pages' ? '/ninja-turtle-pizza/' : '/'

export default defineConfig({
  base,
  plugins: [react()],
})
