import axios from 'axios'
import { Notify } from 'vant'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

service.interceptors.response.use(
  response => {
    const res = response.data
    if (response.status !== 200) {
      Notify({
        type: 'warning',
        message: res.message || 'Error',
      })
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Notify({
      type: 'danger',
      message: '数据获取失败',
    })
    return Promise.reject(error)
  }
)

export default service