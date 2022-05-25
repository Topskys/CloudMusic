export default function RqtCellPhoneLogin(phone, password) {
    return this.$Request({
        url: '/login/cellphone',
        params: {
            phone,
            password,
        }
    })
}
export default function reqLogout() {
    return this.$Request({
        url: '/logout'
    })
}
export default function RqtUserPlayList(uid) {
    return this.$Request({
        url: '/user/playlist',
        params: {
            uid,
        }
    })
}
export default function RqtUserAnchor(uid) {
    return this.$Request({
        url: '/user/dj',
        params: {
            uid,
        }
    })
}
export function RqtUserFollows(uid) {
    return this.$Request({
        url: '/user/follows',
        params: {
            uid,
        }
    })
}