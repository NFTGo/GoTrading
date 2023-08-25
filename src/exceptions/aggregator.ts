import { BaseException, ExceptionType } from './base';

enum ApiExceptionType {
  API_KEY_ERROR = 'api_key_error',
  API_CHAIN_ERROR = 'api_chain_error',
  REQUEST_ERROR = 'request_error',
  SIGNATURE_ERROR = 'signature_error',
  MARKETPLACE_ERROR = 'marketplace_error',
}

/**
 * NFTGo API's wrapper error object
 */
export class AggregatorApiException extends BaseException {
  constructor(public code: number | string, public message: string = '', public url?: string) {
    super(code, message);
  }

  static missApiKeyError() {
    return new AggregatorApiException(ApiExceptionType.API_KEY_ERROR, this.missingParam('apiKey'));
  }

  static invalidLimitError(url: string, max: number) {
    return new AggregatorApiException(ExceptionType.PARAM_ERROR, this.invalidParam('limit', `capped at ${max}`), url);
  }

  static requestError(url: string, msg: string) {
    return new AggregatorApiException(ApiExceptionType.REQUEST_ERROR, msg, url);
  }

  static apiEmptyResponseError(url: string) {
    return new AggregatorApiException(ExceptionType.RESPONSE_DATA_EMPTY, 'response is empty', url);
  }
}
