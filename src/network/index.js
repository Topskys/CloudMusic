import { request } from '@/network/request'


//获取歌单评论
export function getSheetComment(id, currPage = 1, limit = 30) {
    return request({
        url: "/comment/playlist",
        params: {
            id,
            offset: (currPage - 1) * 30,
            limit,
        }
    })
}