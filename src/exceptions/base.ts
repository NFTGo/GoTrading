/**
 * NFTGo SDK's base error types
 */
export enum ExceptionType {
  PARAM_ERROR = 'param_error',
  RESPONSE_DATA_EMPTY = 'response_data_empty',
  EXTERNAL_SERVICE_ERROR = 'external_service_error',
}
/**
 * NFTGo SDK's base wrapper error object
 */

export class BaseException extends Error {
  constructor(public code: number | string, public message: string = '') {
    super(message);
  }

  static httpUnsuccessfulResponse(msg: string) {
    return new BaseException(ExceptionType.EXTERNAL_SERVICE_ERROR, msg);
  }

  static httpRequestError(msg: string) {
    return new BaseException(ExceptionType.EXTERNAL_SERVICE_ERROR, msg);
  }

  static missingParam(paramName: string) {
    return `The param '${paramName}' is required.`;
  }

  static invalidParam(paramName: string, extMsg?: string) {
    return `The param '${paramName}' is invalid. ${extMsg || ''}`;
  }

  static invalidParamError(paramName: string, extMsg?: string) {
    return new BaseException(ExceptionType.PARAM_ERROR, this.invalidParam(paramName, extMsg));
  }

  static paramErrorDefault(msg?: string) {
    return new BaseException(ExceptionType.PARAM_ERROR, msg);
  }

  static missingParamError(paramName: string) {
    return new BaseException(ExceptionType.PARAM_ERROR, this.missingParam(paramName));
  }

  static emptyResponseError() {
    return new BaseException(ExceptionType.RESPONSE_DATA_EMPTY, 'response is empty');
  }
}
