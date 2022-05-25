//自行封装时间格式函数，或者安装npm i moment --save then x.format('yyyy-mm-dd')
import moment from 'moment'

export function formatDate(time) {
    if (time = '' || !time) {
        return '——'
    } else {
        var date = moment(time).format('yyyy年MM月dd日'); //'YYYY-MM-DD HH:mm:ss'
        return date;
    }
}

export function dateTimeFormat(dateTime) {

    var y = dateTime.getFullYear()
    var m = (dateTime.getMonth() + 1 + "").toString().padStart(2, '0')
    var d = dateTime.getDate().toString().padStart(2, '0')
    var hh = dateTime.getHours().toString().padStart(2, '0')
    var mm = dateTime.getMinutes().toString().padStart(2, '0')
    var ss = dateTime.getSeconds().toString().padStart(2, '0')

    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
}