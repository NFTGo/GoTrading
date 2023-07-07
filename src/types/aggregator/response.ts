import { ActionKind, ActionTaskExecutor, AggregatorAction } from '../action';

export interface AggregatorApiResponse {
  actions: AggregatorAction<ActionKind>[];
}

export interface AggregatorResponse {
  actions: AggregatorAction<ActionKind>[];
  executeActions: ActionTaskExecutor['execute'];
}

export interface AggregatorApiStatusResponse<T> {
  code: 'SUCCESS' | 'SYSTEM_ERROR';
  msg: string;
  data: T;
}
