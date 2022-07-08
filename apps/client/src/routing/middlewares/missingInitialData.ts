import { analyzeStore } from '@app/stores/analyze';
import { MiddlewareContext } from '@app/routing/types';

/**
 * Redirect if initial data is missing.
 * 
 * @param {MiddlewareContext} context
 * @param {CallableFunction} next
 * @returns {void}
 */
export default function missingInitialData(context: MiddlewareContext, next: CallableFunction) {
  if (! analyzeStore.state.initialUrl && ! analyzeStore.state.initialSnippet) {
    context.router.push({ name: 'index' });
    return;
  }
  
  next();
}