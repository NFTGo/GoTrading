import { ActionKind, AggregatorAction } from '../action';
import { Utils } from '../utils';

export interface AggregatorApiResponse {
  actions: AggregatorAction<ActionKind>[];
}

export interface AggregatorResponse {
  actions: AggregatorAction<ActionKind>[];
  executeActions: Utils['createActionExecutor'];
}

export interface AggregatorApiStatusResponse<T> {
  code: 'SUCCESS' | 'SYSTEM_ERROR';
  msg: string;
  data: T;
}
