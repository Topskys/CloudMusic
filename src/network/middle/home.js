import { request } from '@/network/request.js'

export function RqtBanner() {
    return request({
        url: '/banner'
    })
}
export function RqtRmdSheet() { //推荐歌单
    return request({
        url: "/top/playlist",
        params: {
            //offset: (Math.random() * 1297).toFixed(0) - 12, //偏移数量 , 用于分页 , 如 :( 评论页数 -1)*50, 其中 50 为 limit 的值
            limit: 12
        }
    })
}
export function RqtPrivate() { //独家放送
    return request({
        url: '/personalized/privatecontent'
    })
}
export function RqtNewSong(limit = 12) { //最新音乐
    return request({
        url: '/personalized/newsong',
        params: {
            limit,
        }
    })
}
export function RqtRmdMV() { //推荐mv
    return request({
        url: '/personalized/mv'
    })
}
export function RqtChartsDetail(id) { //获取排行榜歌曲
    return request({
        url: "/playlist/detail",
        params: {
            id,
        }
    })
}
export function RqtSongListInfoDetail(ids) { //从推荐歌单进入
    return request({
        url: "/song/detail",
        params: {
            ids,
        }
    })
}
export function RqtSongListComment(songsId) { //评论
    return request({
        url: "comment/playlist",
        params: {
            id: songsId
        }
    })
}
export function RqtSongListCollector(songsId) { //收藏歌单的用户
    return request({
        url: "playlist/subscribers",
        params: {
            id: songsId
        }
    })
}
export function RqtSongLyric(id) { //歌词
    return request({
        url: "/lyric",
        params: {
            id,
        }
    })
}
export function RqtSongLyricComment(id, limit = 20, offset = 0) { //歌词评论
    return request({
        url: "/comment/music",
        params: {
            id,
            limit,
            offset,
        }
    })
}
export function RqtSongSimi(id) { //获取相似歌曲
    return request({
        url: "/simi/song",
        params: {
            id,
        }
    })
}
export function RqtMVDetail(mvid) { //获取mv数据
    return request({
        url: "/mv/detail",
        params: {
            mvid,
        }
    })
}
export function RqtMVDetailInfo(mvid) { //获取mv数据
    return request({
        url: "/mv/detail/info",
        params: {
            mvid,
        }
    })
}