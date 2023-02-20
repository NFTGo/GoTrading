/**
 * NFTGo SDK's base error types
 */
enum ExceptionType {
  PARAM_ERROR = 'param_error',
}
/**
 * NFTGo SDK's base wrapper error object
 */
export class AggregatorBaseException extends Error {
  constructor(public code: number | string, public message: string = '') {
    super(message, {
      cause: '',
    });
  }

  static missingParam(paramName: string) {
    return `The param '${paramName}' is required.`;
  }

  static invalidParam(paramName: string, extMsg?: string) {
    return `The param '${paramName}' is invalid. ${extMsg || ''}`;
  }

  static invalidParamError(paramName: string, extMsg?: string) {
    return new AggregatorApiException(ExceptionType.PARAM_ERROR, this.invalidParam(paramName, extMsg));
  }

  static paramErrorDefault(msg?: string) {
    return new AggregatorApiException(ExceptionType.PARAM_ERROR, msg);
  }

  static missingParamError(paramName: string) {
    return new AggregatorApiException(ExceptionType.PARAM_ERROR, this.missingParam(paramName));
  }
}

enum ApiExceptionType {
  API_KEY_ERROR = 'api_key_error',
  API_CHAIN_ERROR = 'api_chain_error',
  REQUEST_ERROR = 'request_error',
  RESPONSE_DATA_EMPTY = 'response_data_empty',
  NFTGo_DATA_EMPTY = 'nftgo_data_empty',
}

/**
 * NFTGo API's wrapper error object
 */
export class AggregatorApiException extends AggregatorBaseException {
  constructor(public code: number | string, public message: string = '') {
    super(message, '');
  }

  static invalidLimitError(max: number) {
    return new AggregatorApiException(ExceptionType.PARAM_ERROR, this.invalidParam('limit', `capped at ${max}`));
  }
}

enum UtilsExceptionType {
  DECODE_LOG_ERROR = 'decode_log_error',
}

export class AggregatorUtilsException extends AggregatorBaseException {
  constructor(public code: number | string, public message: string = '') {
    super(message, '');
  }
  static initApiFirst() {
    return new AggregatorUtilsException(ExceptionType.PARAM_ERROR, this.missingParam('api instance'));
  }
  static provideProviderFirst() {
    return new AggregatorUtilsException(ExceptionType.PARAM_ERROR, this.missingParam('provider'));
  }

  static decodeLogError(msg?: string) {
    return new AggregatorUtilsException(UtilsExceptionType.DECODE_LOG_ERROR, msg);
  }
}
