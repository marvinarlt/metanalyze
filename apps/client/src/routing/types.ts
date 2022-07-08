import { Component } from 'vue';
import { Router, RouteLocationNormalized } from 'vue-router';

export type MiddlewareContext = {
  from: RouteLocationNormalized,
  to: RouteLocationNormalized,
  router: Router
}

export type MiddlewareCollection = CallableFunction[];

export type RouteMeta = {
  layout?: Component,
  middlewares?: MiddlewareCollection
}
