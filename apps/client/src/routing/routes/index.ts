import DefaultLayout from '@app/layouts/DefaultLayout.vue';

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