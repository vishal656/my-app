import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setupTests.ts',
    include: ['src/tests/**/*.test.{ts,tsx}'],
    coverage: {
      provider: 'v8',                 // or 'istanbul'
      reporter: ['text', 'html'],     // v4 uses singular
      exclude: [
        '**/*.js',
        '**/node_modules/**',
        '**/dist/**',
      ],
    },
  },
})
