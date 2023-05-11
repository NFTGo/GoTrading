import { HttpsProxyAgent } from 'https-proxy-agent';
import { camel, underline } from '../helpers/key-format';
import { AggregatorApiException, BaseException } from './exception';

import { HTTPClient } from './interface';

export class HTTPClientStable implements HTTPClient {
  constructor(private agent?: HttpsProxyAgent) {}
  fetch<R>(input: RequestInfo | URL, init?: RequestInit | undefined, needOriginResponse?: boolean) {
    const agentOption = this.agent ? { agent: this.agent } : {};
    return new Promise<R>((resolve, reject) => {
      fetch(input, { ...init, ...agentOption })
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
            if (needOriginResponse) {
              resolve(res);
            } else {
              resolve(camel(res));
            }
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

  post<R, P = undefined>(url: string, data: P, headers?: Record<string, string>, useOriginData?: boolean): Promise<R> {
    const body = useOriginData ? JSON.stringify(data) : JSON.stringify(underline(data));
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
