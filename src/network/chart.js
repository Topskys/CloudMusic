import { request } from '@/network/request'

export function RqtTopList() {
    return request({
        url: "/toplist/detail",
    })
}