import { createApp } from 'vue';
import App from '@app/App.vue';
import router from '@app/routing/router';
import i18n from '@app/i18n';

import '@app/scss/main.scss';

createApp(App)
  .use(router)
  .use(i18n)
  .mount('#app');
