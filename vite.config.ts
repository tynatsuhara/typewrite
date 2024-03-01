import { resolve } from 'path'
import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'

export default defineConfig({
  plugins: [solidPlugin()],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        nested: resolve(__dirname, 'print/index.html'),
      },
    },
  },
  // the project is deployed at ty.pizza/typewrite, so we need to configure the base path
  base: process.env.NODE_ENV === 'production' ? 'typewrite/' : '/',
})
