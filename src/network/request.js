import axios from 'axios'

export function axiosRequest(config) {//封装axios请求
    //1.创建axios实例
    const instance = axios.create({
      baseURL:'http://localhost:8443/api',
      timeout:8000,
    })
    //发送真正的axios网络请求
    return instance(config)
}
