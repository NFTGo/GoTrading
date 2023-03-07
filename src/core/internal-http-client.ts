import { HttpsProxyAgent } from 'https-proxy-agent';
import { camel } from '../helpers/key-format';
import { AggregatorApiException } from './exception';

import { HTTPClient } from './interface';

export class InternalHTTPClient implements HTTPClient {
  constructor(private agent?: HttpsProxyAgent) {}
  fetch<R>(input: RequestInfo | URL, init?: RequestInit | undefined) {
    const agentOption = this.agent ? { agent: this.agent } : {};
    return new Promise<R>((resolve, reject) => {
      fetch(input, { ...init, ...agentOption })
        .then(async (res) => {
          if (res.status !== 200) {
            reject(
              new AggregatorApiException(
                res.status,
                res.statusText?.length > 0 ? await res.json() : res.statusText,
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
            resolve(camel(res));
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

  post<R, P = Object>(url: string, data: P, headers: Record<string, string>): Promise<R> {
    return this.fetch<R>(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { ...headers, 'Content-Type': 'application/json' },
    });
  }
}
