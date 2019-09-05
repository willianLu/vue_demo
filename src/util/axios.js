import axios from "axios";

const ajax = axios.create({
  withCredentials: true,
  timeout: 8000, // 请求超时时间
  headers: {
    "X-Requested-With": "XMLHttpRequest"
  }
});

ajax.interceptors.response.use(
  response => response.data,
  error => Promise.reject(error)
);

const get = (url, params) =>
  ajax.get(url, { params }).catch(err => Promise.reject(err));

const post = (url, params) =>
  ajax.post(url, params).catch(err => Promise.reject(err));

export { get, post };
