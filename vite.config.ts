import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import path from 'path'

export default defineConfig({
    plugins: [dts({
        outDir: 'dist/types',
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