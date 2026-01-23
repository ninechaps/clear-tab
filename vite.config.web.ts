import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// Web preview config - without crxjs plugin for direct browser access
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
        },
    },
    server: {
        host: true,
        port: 5173,
        proxy: {
            '/api': {
                target: 'https://zenquotes.io',
                changeOrigin: true,
                rewrite: (path) => path,
            },
        },
    },
});
