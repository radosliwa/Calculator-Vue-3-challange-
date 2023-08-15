/// <reference types="vitest" />

import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'url'
import vue from '@vitejs/plugin-vue'
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': new URL('./src/', import.meta.url).pathname
        }
    },
    server: {
        port: 4000
    },
    test: {
        globals: true,
        environment: 'happy-dom',
        coverage: {
            provider: 'istanbul'
        }
    }
})
