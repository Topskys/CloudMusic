import { request } from '@/network/request'

export function reqVideoLabels() { //获取视频标签下的 视频标签列表
    return request({
        url: '/video/group/list'
    })
}
export function reqVideosGroups(id, offset = 30) { //传入视频标签列表的id可获得相关 标签视频
    return request({
        url: '/video/group',
        params: {
            id,
            offset, //用于分页
        },
    })
}

export function reqVideoDetail(id) { //获取视频标签列表下的 视频的详情(toPlay)
    return request({
        url: '/video/detail',
        params: {
            id,
        }
    })
}
export function reqVideoDetailInfo(vid) { //视频详情页面信息 点赞、转发、评论
    return request({
        url: '/video/detail/info',
        vid,
    })
}
export function reqVideoUrl(id) { //视频详情页面要播放的 视频地址
    return request({
        url: '/video/url',
        params: {
            id,
        }
    })
}
export function reqVideoComment(id, limit = 20, offset = 0) { //视频详情页面要播放的视频地址
    return request({
        url: '/comment/video',
        params: {
            id,
            limit,
            offset,
        }
    })

}
export function reqRelatedVideo(id) { //获取相关视频列表
    return request({
        url: "/related/allvideo",
        params: {
            id,
        },
    })
}
export function RqtAllVideo(area = '内地', limit = 20, offset = 0) {
    return request({
        url: '/mv/all',
        params: {
            area,
            limit,
            offset,
        }
    })
}