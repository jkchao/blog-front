import axios from 'axios'
import * as config from '../config.js'
import querystring from 'querystring'

const ax = axios.create({
  baseURL: config.API_ROOT
})

// 拦截器
ax.interceptors.request.use(config => {
  if (
    config.method === 'post' ||
    config.method === 'put' ||
    config.method === 'delete' ||
    config.method === 'patch'
  ) {
    config.data = querystring.stringify(config.data)
  }
  return config
}, error => {
  return Promise.reject(error)
})

ax.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.reject(error)
})

export default ax
