import { createRouter, createWebHistory, RouteLocationNormalized, Router } from 'vue-router';
import { MiddlewareCollection, MiddlewareContext, RouteMeta } from '@app/routing/types';
import indexRoutes from '@app/routing/routes/index';
import dashboardRoutes from '@app/routing/routes/dashboard';

const router: Router = createRouter({
  history: createWebHistory(),
  routes: [
    ...dashboardRoutes,
    ...indexRoutes,
  ]
});

/**
 * @param {MiddlewareContext} context 
 * @param {MiddlewareCollection} middlewares
 * @param {number} index 
 * @returns {CallableFunction}
 */
function nextFactory(context: MiddlewareContext, middlewares: MiddlewareCollection, index: number): CallableFunction {
  const subsequentMiddleware: CallableFunction = middlewares[index];

  return () => {
    if (! subsequentMiddleware) {
      return true;
    }

    const nextMiddleware: CallableFunction = nextFactory(context, middlewares, index + 1);

    return subsequentMiddleware(context, nextMiddleware);
  }
}

router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized) => {
  const toRouteMeta: RouteMeta = to.meta;

  if (! ('middlewares' in toRouteMeta) || 0 === toRouteMeta.middlewares.length) {
    return true;
  }

  const middlewares: MiddlewareCollection = Array.isArray(toRouteMeta.middlewares)
    ? toRouteMeta.middlewares
    : [toRouteMeta.middlewares];

  const context: MiddlewareContext = { from, to, router };
  const nextMiddleware: CallableFunction = nextFactory(context, middlewares, 1);

  return middlewares[0](context, nextMiddleware);
});

export default router;