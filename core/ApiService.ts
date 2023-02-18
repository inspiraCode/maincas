import axios, { Method } from 'axios';
import { nanoid } from 'nanoid';
import toCacheKey from './toCacheKey';

const AxiosCancelToken = axios.CancelToken;

const Request = async (
  method: Method,
  urlPath: string,
  data: any,
  token?: string,
  BaseURL?: string | null,
  abortSignal?: AbortSignal
) => {
  try {
    const baseUrl = BaseURL || process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
    if (!baseUrl) return;

    const response = await axios(baseUrl + urlPath, {
      method,
      data,
      headers: {
        Authorization: `Bearer ${token}`
      },
      signal: abortSignal
    });

    return response.data;
  } catch (error: any) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error(error.response);
      if (error.response.status === 401) {
        // AuthCentralService.RequestLogin();
        console.log('Error 401');
      }
      if (error.response.status === 403) {
        // AuthCentralService.ShowForbiddenError();
        console.log('Error 403');
      }
      if (error.response.data) {
        console.error(error.response.data);
        throw error.response.data;
      } else {
        throw error;
      }
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.error(error.request);
      throw error.request;
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error', error.message);
      throw error;
    }
  }
};

const setIdempotencyKey = cacheKey => {
  const id = nanoid(10);
  localStorage.setItem('idempotency', JSON.stringify({ cacheKey, id }));
  return id;
};

const getIdempotencyKey = () => {
  try {
    return JSON.parse(localStorage.getItem('idempotency') || 'null');
  } catch {
    return null;
  }
};

const generateIdempotencyId = (required, ...args) => {
  let cacheKey = toCacheKey(...args);
  let current = getIdempotencyKey();
  if (current?.cacheKey !== cacheKey) {
    return setIdempotencyKey(cacheKey);
  } else {
    // TODO: should we throw exception? or
    // should we alert the user to re-send?
    if (required) {
      throw new Error('Se ha prevenido re-envio de operacion.');
    }
    return current.id;
  }
};

//Short Aliases to Request calls:
const Get = async (
  urlPath: string,
  token?: string,
  baseURL?: string | null,
  abortSignal?: AbortSignal
) => await Request('GET', urlPath, null, token, baseURL, abortSignal);

const Post = async (
  urlPath: string,
  data?: any,
  token?: string,
  baseURL?: string,
  idemp = false
) => {
  const idempotencyId = generateIdempotencyId(idemp, urlPath, data, baseURL);
  return await Request(
    'POST',
    urlPath,
    { ...data, idempotencyId },
    token,
    baseURL
  );
};

const Put = async (
  urlPath: string,
  data?: any,
  token?: string,
  baseURL?: string,
  idemp = false
) => {
  const idempotencyId = generateIdempotencyId(idemp, urlPath, data, baseURL);
  return await Request(
    'PUT',
    urlPath,
    { ...data, idempotencyId },
    token,
    baseURL
  );
};

const Delete = async (
  urlPath: string,
  data?: any,
  token?: string,
  baseURL?: string,
  idemp = false
) => {
  const idempotencyId = generateIdempotencyId(idemp, urlPath, data, baseURL);
  return await Request(
    'DELETE',
    urlPath,
    { ...data, idempotencyId },
    token,
    baseURL
  );
};

export { Request, Get, Post, Put, Delete, AxiosCancelToken };
