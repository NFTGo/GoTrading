import { AggregatorException } from './exception';
import { Axios, AxiosResponse, AxiosRequestConfig } from 'axios';

import { HTTPClient } from './interface';

export class InternalHTTPClient implements HTTPClient {
  private readonly instance = new Axios({});

  constructor() {
    /**
     * Configure the axios interceptor
     */
    this.instance.interceptors.request.use(this.requestInterceptor.bind(this));
    this.instance.interceptors.response.use(this.responseInterceptors.bind(this));
  }

  get<R, Q = undefined>(url: string, query: Q | undefined, headers: Record<string, string>): Promise<R> {
    return this.instance.get(url, { headers, params: query });
  }

  post<R, P = Object>(url: string, data: P, headers: HeadersInit): Promise<R> {
    return this.instance.post(url, { data, headers });
  }

  private responseInterceptors(response: AxiosResponse) {
    if (response.status !== 200) {
      throw new AggregatorException(response.status, response.statusText);
    }

    const { code, msg, data } = response.data;

    if (code !== 200) {
      throw new AggregatorException(code, msg);
    }

    return data;
  }

  private requestInterceptor(config: AxiosRequestConfig) {
    return config;
  }
}
