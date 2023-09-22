import { ActionKind, ActionTaskExecutor, AggregatorAction } from '../action';

export interface AggregatorApiResponse {
  actions: AggregatorAction<ActionKind>[];
  invalidOrderHashes?: string[];
  invalidOrderIds?: string[];
}

export interface AggregatorResponse {
  actions: AggregatorAction<ActionKind>[];
  invalidOrderHashes?: string[];
  invalidOrderIds?: string[];
  executeActions: ActionTaskExecutor['execute'];
}

export interface AggregatorApiStatusResponse<T> {
  code: 'SUCCESS' | 'SYSTEM_ERROR';
  msg: string;
  data: T;
}
