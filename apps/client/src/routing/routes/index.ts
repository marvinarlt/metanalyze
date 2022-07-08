import missingInitialData from '@app/routing/middlewares/missingInitialData';
import DefaultLayout from '@app/layouts/DefaultLayout.vue';
import AnalyzeLayout from '@app/layouts/AnalyzeLayout.vue';

export default [
  {
    path: '/',
    name: 'index',
    meta: {
      layout: DefaultLayout
    },
    component: () => import('@app/pages/Index.vue')
  },
  {
    path: '/analyze',
    name: 'analyze',
    meta: {
      layout: AnalyzeLayout,
      // middlewares: [missingInitialData]
    },
    component: () => import('@app/pages/Analyze.vue')
  },
  {
    path: '/imprint',
    name: 'imprint',
    meta: {
      layout: DefaultLayout
    },
    component: () => import('@app/pages/Imprint.vue')
  },
  {
    path: '/privacy-policy',
    name: 'privacy-policy',
    meta: {
      layout: DefaultLayout
    },
    component: () => import('@app/pages/PrivacyPolicy.vue')
  }
];