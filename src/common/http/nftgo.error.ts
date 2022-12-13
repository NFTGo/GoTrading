/**
 * NFTGo API SDK's error code
 */
export enum NFTGoErrorType {
  API_KEY_ERROR = 'api_key_error',
  API_CHAIN_ERROR = 'api_chain_error',
  REQUEST_ERROR = 'request_error',
  RESPONSE_DATA_EMPTY = 'response_data_empty',
  NFTSCAN_DATA_EMPTY = 'nftgo_data_empty',
  PARAM_ERROR = 'param_error',
}
/**
 * NFTGo API SDK's wrapper error object
 */
export class NFTGoError {
  /**
   * error code
   */
  code: string | number | undefined = '';

  /**
   * error message
   */
  msg: string = '';

  constructor(code: string | number | undefined, msg?: string) {
    this.code = code;
    this.msg = msg || '';
  }
}

function missingParam(paramName: string) {
  return `The param '${paramName}' is required.`;
}

function invalidParam(paramName: string, extMsg?: string) {
  return `The param '${paramName}' is invalid. ${extMsg || ''}`;
}

export function invalidParamError(paramName: string, extMsg?: string) {
  return Promise.reject(new NFTGoError(NFTGoErrorType.PARAM_ERROR, invalidParam(paramName, extMsg)));
}

export function paramErrorDefault(msg?: string) {
  return Promise.reject(new NFTGoError(NFTGoErrorType.PARAM_ERROR, msg));
}

export function missingParamError(paramName: string) {
  return Promise.reject(new NFTGoError(NFTGoErrorType.PARAM_ERROR, missingParam(paramName)));
}

export function invalidLimitError(max: number) {
  return Promise.reject(new NFTGoError(NFTGoErrorType.PARAM_ERROR, invalidParam('limit', `capped at ${max}`)));
}
