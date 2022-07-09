import missingInitialData from '@app/routing/middlewares/missingInitialData';
import DashboardLayout from '@app/layouts/DashboardLayout.vue';

export default [
  {
    path: '/dashboard',
    name: 'dashboard-index',
    meta: {
      layout: DashboardLayout,
      middlewares: [missingInitialData]
    },
    component: () => import('@app/pages/DashboardIndex.vue')
  }
];