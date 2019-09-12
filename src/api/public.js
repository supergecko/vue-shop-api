import axios from 'axios'
// 取消请求

let CancelToken = axios.CancelToken

// 设置默认请求头，如果不需要可以取消这一步
// axios.defaults.headers = {
//     'X-Requested-With': 'XMLHttpRequest'
// }

// 请求超时的时间限制
axios.defaults.timeout = 20000

// 开始设置请求 发起的拦截处理
// config 代表发起请求的参数的实体
axios.interceptors.request.use(config => {
// 得到参数中的 requestName 字段，用于决定下次发起请求，取消对应的 相同字段的请求
// 如果没有 requestName 就默认添加一个 不同的时间戳
  let requestName
  if (config.method === 'post') {
    if (config.data && config.data.requestName) {
      requestName = config.data.requestName
    } else {
      requestName = new Date().getTime()
    }
  } else {
    if (config.params && config.params.requestName) {
      requestName = config.params.requestName
    } else {
      requestName = new Date().getTime()
    }
  }
  // 判断如果这里拿到的参数中的 requestName 在上一次请求中已经存在，就取消上一次的请求
  if (requestName) {
    if (axios[requestName] && axios[requestName].cancel) {
      axios[requestName].cancel()
    }
    config.cancelToken = new CancelToken(c => {
      axios[requestName] = {}
      axios[requestName].cancel = c
    })
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

// 将axios 的 post 方法，绑定到 vue 实例上面的 $post
export const ypost = function (url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(res => {
        resolve(res)
      }).catch(err => { reject(err) })
  })
}

export const yget = function (url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    }).then(res => {
      resolve(res) // 返回请求成功的数据 data
    }).catch(err => {
      reject(err)
    })
  })
}

