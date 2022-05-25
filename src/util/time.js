//将毫秒置换成 分钟:秒
export function resetMin(time) {
    let min = Math.floor((time / 1000 / 60) << 0)
    let sec = Math.floor((time / 1000) % 60)
    if (sec < 10) sec = "0" + sec
    if (min < 10) min = "0" + min
    return min + ":" + sec
}