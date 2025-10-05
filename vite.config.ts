import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: './key.pem',
      cert: './cert.pem',
    },
    host: 'localhost',
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://45.90.216.217',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
