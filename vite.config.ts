import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path'

export default defineConfig({
    plugins: [
        tsconfigPaths(),
        dts({
            outDir: 'dist/types',
            insertTypesEntry: true,
        })],
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            name: 'Revornix',
            fileName: (format) => `revornix.${format}.js`,
            formats: ['es', 'cjs']
        },
        rollupOptions: {
            external: [],
        }
    }
})