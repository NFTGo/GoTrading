import { AggregatorApiException } from '@/exceptions';

import { HTTPClient } from '@/types';

export class HTTPClientStable implements HTTPClient {
  constructor() {}
  fetch<R>(input: RequestInfo | URL, init?: RequestInit | undefined) {
    return new Promise<R>((resolve, reject) => {
      fetch(input, init)
        .then(async (res) => {
          if (!isHttpResponseSuccess(res.status)) {
            reject(
              new AggregatorApiException(
                res.status,
                res.statusText?.length > 0 ? JSON.stringify(await res.json()) : res.statusText,
                res.url
              )
            );
          }
          return res.json();
        })
        .catch((e) => {
          reject(AggregatorApiException.requestError(input?.toString(), e));
        })
        .then((res) => {
          if (!res) {
            reject(AggregatorApiException.apiEmptyResponseError(input?.toString()));
          } else {
            resolve(res);
          }
        });
    });
  }

  get<R, Q = Object>(url: string, query: Q | undefined, headers: Record<string, string>): Promise<R> {
    const params = [];
    let actualUrl = url;
    for (const key in query) {
      if (query[key] instanceof Array) {
        for (const value of query[key] as unknown as Array<any>) {
          value !== null && value !== undefined && params.push(`${key}=${value}`);
        }
      } else {
        query[key] !== null && query[key] !== undefined && params.push(`${key}=${query[key]}`);
      }
    }
    if (params.length !== 0) {
      actualUrl = `${url}?${params.join('&')}`;
    }
    return this.fetch<R>(actualUrl, { headers, method: 'GET' });
  }

  post<R, P = undefined>(url: string, data: P, headers?: Record<string, string>): Promise<R> {
    const body = JSON.stringify(data);
    return this.fetch<R>(url, {
      method: 'POST',
      body: body,
      headers: { ...headers, 'Content-Type': 'application/json' },
    });
  }
}

function isHttpResponseSuccess(status: number): boolean {
  return status >= 200 && status < 300;
}
