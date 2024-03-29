import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

import { resolve } from 'path';
import dts from 'vite-plugin-dts';
import { copyFileSync } from 'fs';

export default defineConfig({
    plugins: [
        vue(),
        dts({
            afterBuild: () => {
                copyFileSync('dist/index.d.ts', 'dist/index.d.cts');
            },
        }),
    ],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'VueSimpleTable',
            fileName: 'vue-simple-table',
        },
        rollupOptions: {
            external: ['vue'],
            output: {
                globals: {
                    vue: 'Vue',
                },
            },
        },
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
        },
    },
});
