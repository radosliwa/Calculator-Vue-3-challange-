/* eslint-disable quotes */
// vite.config.ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '/src'),
        },
    },
    define: {
        'process.env': {},
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
});
