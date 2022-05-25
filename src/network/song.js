import { request } from '@/network/request'

export function RqtSongUrl(id) { //获取歌曲地址
    return request({
        url: '/song/url',
        params: {
            id,
        }
    })
}
export function RqtSongDetail(ids) { //获取歌曲详情
    return request({
        url: '/song/detail',
        params: {
            ids,
        }
    })
}
export function RqtCharts() { //获取所有榜单
    return request({
        url: '/toplist',
    })
}
export function RqtChartsDetail(id) { //获取榜单详情
    return request({
        url: '/playlist/detail',
        params: {
            id,
        }
    })
}
export function RqtHQCover(limit = 1) { //获取歌单页面的精品歌单入口封面
    return request({
        url: '/top/playlist/highquality',
        params: {
            limit,
        }
    })
}
export function RqtHotTags() { //获取发现音乐--歌单的热门标签
    return request({
        url: '/playlist/hot',
    })
}
export function RqtSheets(cat, currPage) { //根据热门标签获取歌单列表
    return request({
        url: '/top/playlist',
        params: {
            cat, //接受当前标签名称
            offset: 50 * (currPage - 1)
        }
    })
}
export function RqtAllSortTags() { //获取所有分类标签
    return request({
        url: '/playlist/catlist',
    })
}



//
export function reqAlbum(id) {
    return request({
        url: '/artist/album',
        params: {
            id,
        }
    })
}