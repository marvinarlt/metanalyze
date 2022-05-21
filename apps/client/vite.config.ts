import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueI18n from '@intlify/vite-plugin-vue-i18n';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueI18n({
      include: path.join(__dirname, '/src/locales/**')
    }),
  ],
  resolve: {
    alias: {
      '@app': path.resolve(__dirname, 'src')
    }
  },
  server: {
    hmr: {
      host: 'localhost',
      protocol: 'ws'
    }
  },
  build: {
    emptyOutDir: true
  }
});
