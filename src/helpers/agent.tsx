import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';
import { ApiError } from 'errors/apiError';
//import { IApiResponse } from 'interfaces/IApiResponse';
import { API } from 'settings';
import store from 'store';

export async function get<AxiosResponse>(url: string, params?: any, headers?: any): Promise<any> {
  return await request({ url, method: 'GET', params, headers });
}

export async function post<T = AxiosResponse>(url: string, data: any, headers?: any): Promise<any> {
  return await request({ url, method: 'POST', data, headers });
}

export async function put<T = AxiosResponse>(url: string, data: any, headers?: any): Promise<any> {
  return await request({ url, method: 'PUT', data, headers });
}

export async function del<T = AxiosResponse>(url: string, params?: any, headers?: any): Promise<any> {
  return await request({ url, method: 'DELETE', params, headers });
}

async function request(options: AxiosRequestConfig, retry: boolean = true) {
  try {
    const result = await axios({
      ...options,
      ...options.params,
      baseURL: API,
      headers: {
        token: `${localStorage.getItem('acessToken')}`,
        'Content-type': 'application/json',
        ...options.headers
      },
    });
    return result;
  } catch (err) {
    return await handleError(err, retry);
  }
}

async function handleError(err: AxiosError, retry: boolean) {
  if (!err.response || err.response.status !== 401 || !retry) {
    throw new ApiError(err.config, err.response, err);
  }
  if (localStorage && localStorage.getItem('acessToken')) {
    return new Promise(resolve => {
      store.dispatch({ type: 'SESSION_EXPIRED' });
    });
  }
  return false;
}

export const agent = { get, post, put, del };