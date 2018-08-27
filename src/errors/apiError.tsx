import { AxiosRequestConfig, AxiosResponse } from 'axios';

import { ServiceError } from './serviceError';

interface IApiErrorMeta {
  request: {
    baseURL: string;
    url: string;
    method: string;
    params: any;
    data: any;
    headers: any;
  };
  response?: {
    status: number;
    data?: any;
  };
  err: any;
}

export class ApiError extends ServiceError<IApiErrorMeta> {
  public readonly status: number;
  public readonly data: any;

  constructor(request: AxiosRequestConfig, axiosResponse: AxiosResponse, err: any) {
    const response = !axiosResponse ? { status: -1, data: '' } : { status: axiosResponse.status, data: axiosResponse.data };

    err && err.request && delete err.request;
    err & err.response && delete err.response;
    err && err.config && delete err.config;

    let req: IApiErrorMeta =  {
      request: {
        baseURL: request.baseURL,
        url: request.url,
        method: request.method,
        params: request.params,
        data: request.data,
        headers: request.headers
      },
      response,
      err
    };

    super('api-error', req, response.status < 500);

    this.status = response.status;
    this.data = response.data;
  }
}