import { loadEnv } from 'vite'
import { defineConfig } from 'vitest/config'

const env = loadEnv('test', process.cwd(), '')

export default defineConfig({
    test: {
        env,
        setupFiles: ['global-setup.ts'],
        fileParallelism: false,
        watch: false,
        silent: true
    },
})
