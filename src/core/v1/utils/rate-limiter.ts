import { RateLimiter } from 'limiter';
export class ExternalServiceRateLimiter {
  limiter: RateLimiter;
  apiKey: string;

  constructor(apiKey: string, limiter: RateLimiter) {
    this.apiKey = apiKey;
    this.limiter = limiter;
  }
  async getAPIKeyWithRateLimiter(): Promise<string> {
    await this.limiter.removeTokens(1);
    return this.apiKey;
  }
}
