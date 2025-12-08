import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    hookTimeout: 0,
    testTimeout: 0,
    globals: true,
    environment: 'node',
    include: ['test/**/*.test.{ts,tsx}', 'test/**/*.spec.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'html'],
      reportsDirectory: 'coverage',
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['test/**', '**/*.test.*', 'scripts/**', 'dist/**', 'node_modules/**', '**/*.d.ts', 'src/types.ts', 'src/index.ts'],
      thresholds: {
        statements: 90,
        branches: 80,
        functions: 90,
        lines: 90
      }
    }
  }
});