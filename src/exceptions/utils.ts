import { ExceptionType, BaseException } from './base';

enum UtilsExceptionType {
  DECODE_LOG_ERROR = 'decode_log_error',
}

export class UtilsException extends BaseException {
  constructor(public code: number | string, public message: string = '') {
    super(message);
  }
  static initApiFirst() {
    return new UtilsException(ExceptionType.PARAM_ERROR, this.missingParam('api instance'));
  }
  static provideProviderFirst() {
    return new UtilsException(ExceptionType.PARAM_ERROR, this.missingParam('provider'));
  }

  static decodeLogError(msg?: string) {
    return new UtilsException(UtilsExceptionType.DECODE_LOG_ERROR, msg);
  }
}
