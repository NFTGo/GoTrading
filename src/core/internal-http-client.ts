import { AggregatorApiException } from './exception';
// import { Axios, AxiosResponse, AxiosRequestConfig } from 'axios';

import { HTTPClient } from './interface';

export class InternalHTTPClient implements HTTPClient {
  constructor() {}
  fetch<R>(input: RequestInfo | URL, init?: RequestInit | undefined) {
    return new Promise<R>((resolve, reject) => {
      fetch(input, { ...init })
        .then((res) => {
          if (res.status !== 200) {
            throw new AggregatorApiException(res.status, res.statusText);
          }
          return res.json();
        })
        .catch((e) => {
          reject(`Request Error:${e}`);
        })
        .then((res) => {
          if (!res) {
            reject(`[URL=${input}]`);
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
        for (const value of query[key] as Array<any>) {
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

  post<R, P = Object>(url: string, data: P, headers: HeadersInit): Promise<R> {
    return this.fetch<R>(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { ...headers, 'Content-Type': 'application/json' },
    });
  }
}
