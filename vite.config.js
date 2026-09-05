import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',
  envPrefix: ['VITE_', 'DATABASE_'],
  server: {
    port: 3000,
    host: true
  }
});
