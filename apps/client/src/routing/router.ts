import { createRouter, createWebHistory, RouteLocationNormalized, Router } from 'vue-router';
import { MiddlewareCollectionType } from '@app/routing/types';
import RouteMetaInterface from '@app/routing/interfaces/RouteMetaInterface';
import MiddlewareContextInterface from '@app/routing/interfaces/MiddlewareContextInterface';
import indexRoutes from '@app/routing/routes/index';

const router: Router = createRouter({
  history: createWebHistory(),
  routes: [
    ...indexRoutes,
  ]
});

/**
 * @param {MiddlewareContextInterface} context 
 * @param {MiddlewareCollectionType} middlewares
 * @param {number} index 
 * @returns {CallableFunction}
 */
function nextFactory(context: MiddlewareContextInterface, middlewares: MiddlewareCollectionType, index: number): CallableFunction {
  const subsequentMiddleware: CallableFunction = middlewares[index];

  return () => {
    if (! subsequentMiddleware) {
      return true;
    }

    const nextMiddleware: CallableFunction = nextFactory(context, middlewares, index + 1);

    return subsequentMiddleware({ ...context, next: nextMiddleware });
  }
}

router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized) => {
  const toRouteMeta: RouteMetaInterface = to.meta;

  if (! ('middlewares' in toRouteMeta) || 0 === toRouteMeta.middlewares.length) {
    return true;
  }

  const middlewares: MiddlewareCollectionType = Array.isArray(toRouteMeta.middlewares)
    ? toRouteMeta.middlewares
    : [toRouteMeta.middlewares];

  const context: MiddlewareContextInterface = { from, to, router };
  const nextMiddleware: CallableFunction = nextFactory(context, middlewares, 1);

  return middlewares[0]({ ...context, next: nextMiddleware });
});

export default router;