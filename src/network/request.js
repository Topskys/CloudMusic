import axios from 'axios'

export function request(options) {

    const http = axios.create({
        baseURL: 'http://localhost:3000',
        // baseURL: '/api', //使用代理api
        timeout: 20000
    })

    //请求拦截
    http.interceptors.request.use(req => {
        return req;
    }, err => {
        console.log(err);
    })

    //响应拦截
    http.interceptors.response.use(res => {
        console.log(res.data);
        return res.data;
    }, err => {
        console.log(err);
    })

    return http(options); //axios.create的返回值是一个promise对象！
}