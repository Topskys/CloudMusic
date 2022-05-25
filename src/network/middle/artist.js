import { request } from '@/network/request'

export function reqArtists(area = -1, type = -1, initial = -1, currPage = 1) { //获取歌手
    return request({
        url: '/artist/list',
        params: {
            area,
            type,
            initial,
            offset: (currPage - 1) * 30,
        }
    })
}
export function reqArtInfo(id) { //获取歌手页面信息（artist和hotSongs）
    return request({
        url: '/artists',
        params: {
            id,
        }
    })
}
export function reqArtDetail(id) { //获取歌手
    return request({
        url: '/artist/detail',
        params: {
            id,
        }
    })
}

export function reqArtAlbum(id, currPage) { //获取歌手专辑
    return request({
        url: '/artist/album',
        params: {
            id,
            offset: (currPage - 1) * 30,
        }
    })
}


export function reqArtMV(id) { //获取歌手mv
    return request({
        url: '/artist/mv',
        params: {
            id,
        }
    })
}

export function reqArtMVUrl(id, r = 1080) { //获取歌手mv
    return request({
        url: '/mv/url',
        params: {
            id,
            r,
        }
    })
}