import { HttpsProxyAgent } from 'https-proxy-agent';
import { camel, underline } from '../helpers/key-format';
import {AggregatorApiException, BaseException} from './exception';

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
            resolve(camel(res));
          }
        });
    });
  }

  get<R, Q = Object>(url: string, query: Q | undefined, headers: Record<string, string>): Promise<R> {
    const params = [];
    let actualUrl = url;
    const underLineQuery = underline(query);
    for (const key in underLineQuery) {
      if (underLineQuery[key] instanceof Array) {
        for (const value of underLineQuery[key] as Array<any>) {
          value !== null && value !== undefined && params.push(`${key}=${value}`);
        }
      } else {
        underLineQuery[key] !== null &&
          underLineQuery[key] !== undefined &&
          params.push(`${key}=${underLineQuery[key]}`);
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
      body: JSON.stringify(underline(data)),
      headers: { ...headers, 'Content-Type': 'application/json' },
    });
  }
}

export class ExternalHTTPClient implements HTTPClient {
  constructor(private agent?: HttpsProxyAgent) {}
  fetch<R>(input: RequestInfo | URL, init?: RequestInit | undefined) {
    const agentOption = this.agent ? { agent: this.agent } : {};
    return new Promise<R>((resolve, reject) => {
      fetch(input, { ...init, ...agentOption })
        .then(async (res) => {
          if (!isHttpResponseSuccess(res.status)) {
            reject(
              BaseException.httpUnsuccessfulResponse(
            `HTTP request to ${input?.toString()} failed with status code ${res.status} and message ${res.statusText?.length > 0 ? JSON.stringify(await res.json()) : res.statusText}`,
              )
            );
          }
          return res.json();
        })
        .catch((e) => {
          reject(BaseException.httpRequestError(`HTTP request to ${input?.toString()} failed with error ${e.message}`));
        })
    });
  }
  get<R, Q = undefined>(url: string, query: Q | undefined, headers?: Record<string, string>): Promise<R> {
    const params = [];
    let actualUrl = url;
    const underLineQuery = underline(query);
    for (const key in underLineQuery) {
      if (underLineQuery[key] instanceof Array) {
        for (const value of underLineQuery[key] as Array<any>) {
          value !== null && value !== undefined && params.push(`${key}=${value}`);
        }
      } else {
        underLineQuery[key] !== null &&
        underLineQuery[key] !== undefined &&
        params.push(`${key}=${underLineQuery[key]}`);
      }
    }
    if (params.length !== 0) {
      actualUrl = `${url}?${params.join('&')}`;
    }
    return this.fetch<R>(actualUrl, { headers, method: 'GET' });
  }

  post<R, P = undefined>(url: string, data: P, headers?: Record<string, string>): Promise<R> {
    return this.fetch<R>(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { ...headers, 'Content-Type': 'application/json' },
    });
  }
}

function isHttpResponseSuccess(status: number): boolean {
  return status >= 200 && status < 300;
}
