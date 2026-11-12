import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Vite base can be adjusted for subpath hosting (e.g. GitHub Pages) if needed
  base: './',
});
