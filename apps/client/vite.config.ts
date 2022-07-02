import { join, resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueI18n from '@intlify/vite-plugin-vue-i18n';
import svgLoader from 'vite-svg-loader';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueI18n({
      include: join(__dirname, '/src/locales/**')
    }),
    svgLoader({ svgo: false }),
  ],
  resolve: {
    alias: {
      '@app': resolve(__dirname, 'src')
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
