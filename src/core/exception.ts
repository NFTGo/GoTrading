/**
 * NFTGo API SDK's wrapper error object
 */
export class AggregatorException extends Error {
  constructor(public code: number | string, public message: string = '') {
    super(message, {
      cause: '',
    });
  }

  private static missingParam(paramName: string) {
    return `The param '${paramName}' is required.`;
  }

  private static invalidParam(paramName: string, extMsg?: string) {
    return `The param '${paramName}' is invalid. ${extMsg || ''}`;
  }

  static invalidParamError(paramName: string, extMsg?: string) {
    return new AggregatorException(ExceptionType.PARAM_ERROR, this.invalidParam(paramName, extMsg));
  }

  static paramErrorDefault(msg?: string) {
    return new AggregatorException(ExceptionType.PARAM_ERROR, msg);
  }

  static missingParamError(paramName: string) {
    return new AggregatorException(ExceptionType.PARAM_ERROR, this.missingParam(paramName));
  }

  static invalidLimitError(max: number) {
    return new AggregatorException(ExceptionType.PARAM_ERROR, this.invalidParam('limit', `capped at ${max}`));
  }
}

/**
 * NFTGo API SDK's error types
 */
enum ExceptionType {
  API_KEY_ERROR = 'api_key_error',
  API_CHAIN_ERROR = 'api_chain_error',
  REQUEST_ERROR = 'request_error',
  RESPONSE_DATA_EMPTY = 'response_data_empty',
  NFT_SCAN_DATA_EMPTY = 'nftgo_data_empty',
  PARAM_ERROR = 'param_error',
}
