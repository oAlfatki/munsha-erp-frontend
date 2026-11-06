import { defineConfig } from 'vitest/config';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  test: {
    env: { TZ: 'Asia/Aden' },
    include: ['tests/{unit,integration,contracts,architecture}/**/*.test.{ts,tsx}'],
    environment: 'node',
  },
});
