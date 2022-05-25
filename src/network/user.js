import { request } from '@/network/request'


export function reqQrState(key) { //检查unikey
    return request({
        url: `/login/qr/check?key=${key}&timerstamp=${Date.now()}`,
        withCredentials: true, //关键//头部信息
    })
}
export function reqLoginState() { //登录状态
    return request({
        url: `/login/status?timerstamp=${Date.now()}`,
        withCredentials: true, //关键//头部信息
    })
}
export function reqKey() { //获取unikey
    return request({
        url: `/login/qr/key?timerstamp=${Date.now()}`,
        withCredentials: true, //关键//头部信息
    })
}
export function reqQrUrl(key) { //生成登录二维码
    return request({
        url: `/login/qr/create?key=${key}&qrimg=true&timerstamp=${Date.now()}`,
        withCredentials: true, //关键//头部信息
    })
}
export function reqLogout() { //退出登录
    return request({
        url: '/logout',
        withCredentials: true, //关键//头部信息
    })
}