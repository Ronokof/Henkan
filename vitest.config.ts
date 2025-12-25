import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  test: {
    hookTimeout: 0,
    testTimeout: 0,
    teardownTimeout: 90000,
    globals: true,
    environment: 'node',
    globalSetup: resolve('./test/setup.ts'),
    include: ['test/**/*.test.{ts,tsx}', 'test/**/*.spec.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'html'],
      reportsDirectory: 'coverage',
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['test/**', '**/*.test.*', 'scripts/**', 'dist/**', 'node_modules/**', '**/*.d.ts', 'src/types.ts', 'src/index.ts'],
      thresholds: {
        statements: 100,
        branches: 100,
        functions: 100,
        lines: 100
      }
    },
    onUnhandledError(error) {
      throw error;
    },
  }
});