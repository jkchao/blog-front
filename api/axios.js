import querystring from 'querystring'

import axios from 'axios'
import * as config from '../config.js'

const ax = axios.create({
  baseURL: config.API_ROOT
})

// 拦截器
ax.interceptors.request.use((data) => {
  if (
    data.method === 'post' ||
    data.method === 'put' ||
    data.method === 'delete' ||
    data.method === 'patch'
  ) {
    data.data = querystring.stringify(data.data)
  }
  return data
}, (error) => {
  return Promise.reject(error)
})

ax.interceptors.response.use((response) => {
  return response
}, (error) => {
  return Promise.reject(error)
})

export default ax
