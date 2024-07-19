import { defineConfig } from 'vite';
import path from 'path';  // Add this line

import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
  },
  resolve: {
    alias: {
      'keenasr-web': path.resolve(__dirname, 'src/keenasr-web-0.4.0/keenasr-web.js')
    }
  },
})
