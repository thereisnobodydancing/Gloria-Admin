import axios from 'axios'
import router from '../router'
import qs from 'qs'

import { createDiscreteApi } from 'naive-ui'
const { message } = createDiscreteApi(['message'])
const baseURL = import.meta.env.VITE_APP_URL
const http = axios.create({
  baseURL,
  timeout: 20000,
})

// 在发起请求时进行拦截，获取token
http.interceptors.request.use(
  req => {
    req.headers.Authorization = window.sessionStorage.getItem("token")
    return req
  },
  error => Promise.reject(error)
)

// 当获取服务器返回的信息时进行的处理
http.interceptors.response.use(
  res => {
    if(res.data.code === 20001) message.warning(res.data.msg)
    if(res.data.code === 20002) {
      window.sessionStorage.removeItem("token")
      alert(res.data.msg)
      router.push('/login')
      location.reload()
    }
    return res
  },
  error => Promise.reject(error)
)

const api = {}

api.get = function(url, params={}) {
  return new Promise((resolve) => {
    http({ method: "get", url: url, params:params }).then((res)=>{ resolve(res) })
  })
}

api.getBlob = function(url, params) {
  return new Promise((resolve) => {
    http({ method: "get", url: url, params:params, responseType: "blob"}).then((res) => { resolve(res) })
  })
}

api.post = function(url, params, useQs=false) {
  let data
  useQs ? data = qs.stringify(params) : data = params
  return new Promise((resolve) => {
    http({ method: "post", url: url, data:data }).then((res) => { resolve(res) })
  })
}

api.put = function(url, params, useQs=false, useData=true) {
  let data
  useQs ? data = qs.stringify(params) : data = params
  return new Promise((resolve) => {
    if(useData) {
      http({ method: "put", url: url, contentType: "application/x-www-form-urlencoded", data: data }).then((res) => { resolve(res) })
    } else {
      http({ method: "put", url: url, contentType: "application/x-www-form-urlencoded", params: params }).then((res) => { resolve(res) })
    }
  })
}

api.delete = function(url, params) {
  return new Promise((resolve) => {
    http({ method: "delete", url: url, params:params }).then((res) => { resolve(res) })
  })
}

export default api
