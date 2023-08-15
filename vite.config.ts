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
        port: 3000
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@import "@/assets/styles/utils/_vars.scss";`
            }
        }
    }
})
