export default {
    getNowMusic(state) {
        if (state.nowmusic === null) {
            state.nowmusic = '';
        }
        //    console.log(state.nowmusic);
        return state.nowmusic;
    },
    getNowMusicMenu(state) {
        if (state.nowmusicmenu.al === undefined) {
            return {
                al: {
                    //   picUrl:require('assets/img/common/logo.png'),
                    name: 'song',
                    picUrl: require('@/assets/img/test.jpg'),
                    id: 0,
                },
                ar: [{
                    id: 0,
                    name: 'artists'
                }],
                dt: 0,
            }
        } else {
            return state.nowmusicmenu;
        }
    },
    getUserSonglist(state) {
        if (state.userPlayList.length > 0) {
            return state.userPlayList
        }
    },
    getMusicListIds(state) {
        return state.musiclistId
    },
    getMusicCount(state) {
        //    console.log(state.musicCount);
        return state.musicCount
    },
    getDuration(state) {
        return state.musicDuration;
    },
    getIsPlay(state) {
        return state.isPlaying;
    },
}