import { ListingOrderProtocol, NFTBaseInfo } from './interface';

/**
 * NFTGo SDK's base error types
 */
enum ExceptionType {
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
}

export class AggregatorBaseException extends Error {
  constructor(public code: number | string, public message: string = '') {
    super(message);
  }

  static missingParam(paramName: string) {
    return `The param '${paramName}' is required.`;
  }

  static invalidParam(paramName: string, extMsg?: string) {
    return `The param '${paramName}' is invalid. ${extMsg || ''}`;
  }

  static invalidParamError(paramName: string, extMsg?: string) {
    return new AggregatorBaseException(ExceptionType.PARAM_ERROR, this.invalidParam(paramName, extMsg));
  }

  static paramErrorDefault(msg?: string) {
    return new AggregatorBaseException(ExceptionType.PARAM_ERROR, msg);
  }

  static missingParamError(paramName: string) {
    return new AggregatorBaseException(ExceptionType.PARAM_ERROR, this.missingParam(paramName));
  }

  static emptyResponseError() {
    return new AggregatorBaseException(ExceptionType.RESPONSE_DATA_EMPTY, 'response is empty');
  }
}

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
export class AggregatorApiException extends AggregatorBaseException {
  constructor(public code: number | string, public message: string = '', public url?: string) {
    super(message);
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

enum UtilsExceptionType {
  DECODE_LOG_ERROR = 'decode_log_error',
}

export class AggregatorUtilsException extends AggregatorBaseException {
  constructor(public code: number | string, public message: string = '') {
    super(message);
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

enum BulkBuyExceptionType {
  HAS_UNLISTED_NFT = 'has_unlisted_nft',
  HAS_EXPIRED_NFT = 'has_expired_nft',
  HAS_SUSPICIOUS_NFT = 'has_suspicious_nft',
  HAS_YOUR_OWN_NFT = 'has_your_own_nft',
  NO_VALID_ORDER = 'no_valid_order',
}

export class AggregatorBulkBuyException extends AggregatorBaseException {
  constructor(public code: number | string, public message: string = '') {
    super(message);
  }
  static hasUnListedNFT(nft: NFTBaseInfo) {
    return new AggregatorBulkBuyException(
      BulkBuyExceptionType.HAS_UNLISTED_NFT,
      `nft: ${nft.contract} #${nft.tokenId} is not listed`
    );
  }

  static hasExpiredNFT(nft: { contract?: string; tokenId?: string }) {
    return new AggregatorBulkBuyException(
      BulkBuyExceptionType.HAS_EXPIRED_NFT,
      `nft: ${nft.contract} #${nft.tokenId} is expired`
    );
  }

  static hasSuspiciousNFT(nft: NFTBaseInfo) {
    return new AggregatorBulkBuyException(
      BulkBuyExceptionType.HAS_SUSPICIOUS_NFT,
      `nft: ${nft.contract} #${nft.tokenId} is not tradable on OpenSea`
    );
  }

  static hasYourOwnNFT(nft: NFTBaseInfo) {
    return new AggregatorBulkBuyException(
      BulkBuyExceptionType.HAS_SUSPICIOUS_NFT,
      `nft: ${nft.contract} #${nft.tokenId} is your own nft`
    );
  }

  static noValidOrder() {
    return new AggregatorBulkBuyException(BulkBuyExceptionType.NO_VALID_ORDER, `None of the NFTs has valid listing`);
  }
}

export class ListingIndexerBaseException extends Error {
  constructor(public code: number | string, public message: string = '') {
    super(message);
  }

  static invalidParam(paramName: string, extMsg?: string) {
    return `The param '${paramName}' is invalid. ${extMsg || ''}`;
  }
}

export class ListingIndexerApiException extends ListingIndexerBaseException {
  constructor(public code: number | string, public message: string = '', public url?: string) {
    super(message);
  }

  static invalidPostOrderVersionError(version: string) {
    return new ListingIndexerApiException(
      ExceptionType.PARAM_ERROR,
      this.invalidParam('version', `capped at ${version}`)
    );
  }

  static invalidSignatureError(signature: string) {
    return new ListingIndexerApiException(
      ApiExceptionType.SIGNATURE_ERROR,
      this.invalidParam('signature', `invalid signature ${signature}`)
    );
  }

  static marketplacePostOrderError(msg: string) {
    return new ListingIndexerApiException(ApiExceptionType.MARKETPLACE_ERROR, this.invalidParam('marketplace', msg));
  }

  static unsupportedOrderbookError(orderbook: string, protocol: string) {
    return new ListingIndexerApiException(
      ExceptionType.PARAM_ERROR,
      this.invalidParam('orderbook', `capped at ${orderbook} for ${protocol}`)
    );
  }

  static unsupportedListProtocolError(protocol: string) {
    return new ListingIndexerApiException(
      ExceptionType.PARAM_ERROR,
      this.invalidParam(
        'protocol',
        `available listing protocols: ${JSON.stringify(Object.values(ListingOrderProtocol))}, got ${protocol}`
      )
    );
  }
}
