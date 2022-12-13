import axios, { AxiosError } from 'axios';

import { isEmpty } from '@/utils';
import NFTGoConst from '@/utils/const';

import { EvmChain } from '../types/common';
import { NFTGoError, NFTGoErrorType } from './nftgo.error';

export interface NFTGoConfig {
  /**
   * The API key of NFTGo
   */
  apiKey: string;

  /**
   * The name of the chain you will be requesting
   */
  chain: EvmChain;
}

function apiKeyError() {
  const error = new NFTGoError(NFTGoErrorType.API_KEY_ERROR, 'The property "apiKey" cannot be empty.');
  console.error(error.msg);
  console.error('To use our APIs, You need to register an account on NFTGo open platform');
  console.error('NFTGo open platform ->', 'https://developer.nftgo.io/');
  return Promise.reject(error);
}

function apiChainError() {
  const error = new NFTGoError(NFTGoErrorType.API_CHAIN_ERROR, 'The property "chain" is invalid');
  console.error(error.msg);
  console.error(`"chian" must be one of the following strings: [${Object.keys(EvmChain).join(',')}]`);
  return Promise.reject(error);
}

/**
 * Configure the axios interceptor
 */
export function initHttpConfig() {
  axios.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      return Promise.reject(new NFTGoError(NFTGoErrorType.REQUEST_ERROR, error.message));
    }
  );
  axios.interceptors.response.use(
    (response) => {
      if (response.status !== 200) {
        return Promise.reject(new NFTGoError(response.status, response.statusText));
      }

      if (isEmpty(response.data)) {
        return Promise.reject(new NFTGoError(NFTGoErrorType.RESPONSE_DATA_EMPTY));
      }

      const { code, msg, data } = response.data;
      if (code !== 200) {
        return Promise.reject(new NFTGoError(code, msg));
      }

      return data;
    },
    (error: AxiosError) => {
      return Promise.reject(new NFTGoError(error.code, error.message));
    }
  );
}

/**
 * NFTGo API SDK's wrapper function of send get http request
 * @param nftgoConfig NFTGo API SDK Initialization parameters {@link NFTGoConfig}
 * @param url The API url
 * @param params The axios get params
 * @returns Promise
 */
export function nftgoGet<T, V>(nftgoConfig: NFTGoConfig, url: string, params?: T): Promise<V> {
  const { apiKey, chain } = nftgoConfig;
  if (isEmpty(apiKey)) {
    return apiKeyError();
  }

  const baseURL = NFTGoConst.BASE_URL[chain];
  if (isEmpty(baseURL)) {
    return apiChainError();
  }

  return axios.get(`${baseURL}${url}`, {
    params,
    headers: { 'X-API-KEY': apiKey, 'X-FROM': 'js_sdk' },
  });
}

/**
 * NFTGo API SDK's wrapper function of send post http request
 * @param nftgoConfig NFTGo API SDK Initialization parameters {@link NFTGoConfig}
 * @param url The API url
 * @param data The axios post data
 * @returns Promise
 */
export function nftgoPost<T, V>(nftgoConfig: NFTGoConfig, url: string, data?: T): Promise<V> {
  const { apiKey, chain } = nftgoConfig;
  if (isEmpty(apiKey)) {
    return apiKeyError();
  }

  const baseURL = NFTGoConst.BASE_URL[chain];
  if (isEmpty(baseURL)) {
    return apiChainError();
  }

  return axios.post(`${baseURL}${url}`, data, { headers: { 'X-API-KEY': apiKey, 'X-FROM': 'js_sdk' } });
}
