import { Router, RouteLocationNormalized } from 'vue-router';

export default interface MiddlewareContextInterface {
  from: RouteLocationNormalized,
  to: RouteLocationNormalized,
  router: Router
}