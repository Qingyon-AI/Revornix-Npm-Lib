import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path'

export default defineConfig({
    resolve: {
        preserveSymlinks: true
    },
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            name: 'revornix',
            formats: ['es', 'cjs', 'umd'],
            fileName: (format) => `revornix.${format}.js`
        },
        rollupOptions: {
            external: ['axios', 'dotenv'],
            output: {
                globals: {
                    axios: 'axios',
                    dotenv: 'dotenv'
                }
            }
        },
        sourcemap: true,
        outDir: 'dist',
    },
    plugins: [
        tsconfigPaths(),
        dts({
            outDir: 'dist/types',
            insertTypesEntry: true,
        })
    ]
})