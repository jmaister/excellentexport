import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

import dts from 'vite-plugin-dts';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, 'src/excellentexport.ts'),
            name: 'ExcellentExport',
            fileName: 'excellentexport',
            formats: ['es', 'umd'],
        },
        rollupOptions: {
            external: [],
            output: {
                entryFileNames: '[name].js',
                chunkFileNames: '[name].js'
            }
        },
        license: {
            fileName: 'excellentexport.js.LICENSE.txt',
        }
    },
    plugins: [
        dts({}),
    ],
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
        },
        tsconfigPaths: true
    }
});
