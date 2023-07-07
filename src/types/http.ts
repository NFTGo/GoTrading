export interface HTTPClient {
  get<R, Q = undefined>(
    url: string,
    query: Q | undefined,
    headers?: Record<string, string>
  ): Promise<R>;
  post<R, P = undefined>(
    url: string,
    data: P,
    headers?: Record<string, string>,
    needOriginResponse?: boolean
  ): Promise<R>;
}
