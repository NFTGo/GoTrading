export default class BaseApi<T> {
  config: T;

  constructor(config: T) {
    this.config = config;
  }
}
