import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: '/wheel/',
  plugins: [react()],
  server: {
    port: 5000,
  },
  ...(mode === 'production'
    ? {
        build: {
          outDir: 'dist',
        },
      }
    : {}),
}));
