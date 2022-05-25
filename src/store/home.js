import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {


    isPlay: false,
    playId: null,
    playIndex: 0, //播放索引
    sheetId: null, //歌单id
    playList: [], //播放列表

    isLogin: false,

    currPL: [],
    currPSId: '', //currentPlaySheetId
    currPlayIdx: -1,
    isFSPlay: false, //isFullScreenPlay
    currTime: 0,
    isMscLoading: false,
    currMscInfo: {}, // save the curr-song of info as a json object
    likeMusics: [],
    likeVideos: [],
}

const store = new Vuex.Store({
    state,
    actions: {},
    mutations: {

        //修改播放状态
        changePlay(state, isPlay) {
            state.isPlay = isPlay
        },

        //修改播放歌曲id
        changePlayId(state, playId) {
            state.playId = playId;
        },

        //修改播放列表和歌单id
        changePlayList(state, obj) {
            if (state.playId !== obj.playId) {
                state.sheetId = obj.sheetId
                state.playIndex = -1
            }
            state.playList = obj.playList.slice(0)
        },


        changeLogin(state, isLogin = false) {
            state.isLogin = isLogin
        },






        //修改播放地址
        changePlayUrl(state, mscId) {
            state.mscId = mscId
        },
        //修改播放状态
        changePlay(state, isPlay) {
            state.isPlay = !isPlay
        },

        changeCurrPlayIdx(state, idx) {
            state.currPlayIdx = idx
        },
        changeFSPlay(state) {
            state.isFSPlay = !state.isFSPlay
        },
        changeMscLoading(state, loading) {
            state.isMscLoading = loading
        },
        changeCurrTime(state, currTime) {
            state.currTime = currTime
        },
        changeRecordMscInfo(state, currMscInfo) {
            state.currMscInfo = currMscInfo
        },
        changeLikeMscList(state, likeMusics) {
            state.likeMusics = likeMusics
        },
        changeLikeVideoList(state, likeVideos) {
            state.likeVideos = likeVideos
        }
    }
})


export default store