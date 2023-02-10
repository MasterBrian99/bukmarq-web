import axios, { AxiosRequestConfig } from 'axios';

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL =
  process.env.NODE_ENV == 'development' ? 'http://localhost:3000/api/' : '';

axiosInstance.interceptors.request.use(function (config) {
  const token = window.localStorage.getItem('_auth');

  if (token && config.headers) {
    config.headers['Authorization'] = 'Bearer ' + token;
  }
  return config;
});

axiosInstance.interceptors.response.use(undefined, function (error) {
  // Error Status code
  const statusCode = error.response ? error.response.status : null;

  // We show the console error only in the development mode.

  // If the un-auth error, we should redirect to login page.
  if (statusCode === 401) {
    window.location.href = '/auth/login';
  }
  // for the both development & production, we need to show the alert.

  // return promise object
  return Promise.reject(error);
});

const apiClient = {
  get: <T>(url: string, params?: object) =>
    axiosInstance.get<T>(url, {
      ...params,
    }),
  post: <T>(url: string, data?: unknown, options?: AxiosRequestConfig) =>
    axiosInstance.post<T>(url, data, options),
  patch: <T>(url: string, data: never) => axiosInstance.patch<T>(url, data),
  delete: <T>(url: string) => axiosInstance.delete<T>(url),
  put: <T>(url: string, data?: unknown) => axiosInstance.put<T>(url, data),
};

export default apiClient;
