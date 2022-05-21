import { Component } from 'vue';
import { MiddlewareCollectionType } from '@app/routing/types';

export default interface RouteMetaInterface {
  layout?: Component,
  middlewares?: MiddlewareCollectionType
}