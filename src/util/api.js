import axios from 'axios'

const BASE_URL = 'http://localhost:3000'

export function request(options) {

    const instance = axios.create({
        baseURL: BASE_URL,
        // baseURL: '/api', //使用代理api
        timeout: 20000,
        withCredentials: true,
    })

    //请求拦截
    instance.interceptors.request.use(req => {
        return req;
    }, err => {
        console.log(err);
    })

    //响应拦截
    instance.interceptors.response.use(res => {
        // console.log(res.data);
        return res.data;
    }, err => {
        console.log(err);
    })

    instance.defaults.withCredentials = true;

    if (options.params) {
        return instance.get(options.url, options.params)
    } else {
        return instance.get(options.url)
    }

}