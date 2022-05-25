import { request } from '@/network/request'

export function reqSearch(keywords, currPage, type = 1) { //请求搜索单曲
    return request({
        url: '/cloudsearch',
        params: {
            keywords,
            offset: (currPage - 1) * 30,
            type,
        }
    })
}