import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        win1x: resolve(__dirname, 'win1x.html'),
        win2x: resolve(__dirname, 'win2x.html'),
        win30: resolve(__dirname, 'win30.html'),
        win311: resolve(__dirname, 'win311.html'),
        win95: resolve(__dirname, 'win95.html'),
        win98: resolve(__dirname, 'win98.html'),
      },
    },
  },
})
