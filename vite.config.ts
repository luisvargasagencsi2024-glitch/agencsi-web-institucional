import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const runtime = globalThis as typeof globalThis & { process?: { env?: Record<string, string | undefined> } }

export default defineConfig({
  base: runtime.process?.env?.GITHUB_ACTIONS ? '/agencsi-web-institucional/' : '/',
  plugins: [react(), tailwindcss()],
})
