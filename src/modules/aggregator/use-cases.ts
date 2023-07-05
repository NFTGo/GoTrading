import {Utils} from '../../interface';
import {AggregateAction} from './interface';

export function executeAllActions(actions: AggregateAction[], utils: Utils) {
  return Promise.resolve(true);
}
