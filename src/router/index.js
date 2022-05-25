import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const routes = [
    //aside
    {
        path: '/',
        redirect: '/discover/style'
    },
    {
        path: '/discover',
        redirect: '/discover/style'
    }, {
        path: '/discover',
        name: 'discover',
        component: () =>
            import ('@/components/aside/Discover'),
        children: [{ //main
                path: 'style',
                component: () =>
                    import ('@/components/discover/Style')
            }, {
                path: 'exclusive',
                component: () =>
                    import ('@/components/discover/Exclusive')
            },
            {
                path: 'sheet',
                component: () =>
                    import ('@/components/discover/Sheet')
            }, {
                path: 'chart',
                component: () =>
                    import ('@/components/discover/Chart')
            }, {
                path: 'singer',
                component: () =>
                    import ('@/components/discover/Singer'),
            }, {
                path: 'latest',
                component: () =>
                    import ('@/components/discover/Latest')
            },

        ]
    },

    //歌单
    {
        path: '/sheet/:id',
        name: 'musicList',
        component: () =>
            import ('@/components/sheet/MusicList'),
        meta: { index: 2 }
    },
    {
        path: '/podcast',
        component: () =>
            import ('@/components/aside/Podcast')
    },
    {
        path: '/friend',
        component: () =>
            import ('@/components/aside/Friend')
    },
    {
        path: '/live',
        component: () =>
            import ('@/components/aside/Live')
    },
    {
        path: '/video',
        redirect: '/video/default',
        component: () =>
            import ('@/components/aside/Videos'),
        children: [{
                path: '/default',
                component: () =>
                    import ('@/components/middle/video/VideoList')
            },
            {
                path: '/mv',
                component: () =>
                    import ('@/components/middle/video/MVList')
            },

        ],
    },
    {
        path: '/local',
        component: () =>
            import ('@/components/aside/Local')
    },
    {
        path: '/recent',
        component: () =>
            import ('@/components/aside/Recent')
    },

    {
        path: '/myPodcast',
        component: () =>
            import ('@/components/aside/Podcast')
    },
    {
        path: '/myCollect',
        component: () =>
            import ('@/components/aside/MyCollect')
    },
    {
        path: '/search',
        name: 'search',
        redirect: '/search/default/:keywords',
        component: () =>
            import ('@/components/header/Search'),
        children: [{
                path: 'default/:keywords', //
                component: () =>
                    import ('@/components/header/SeaSingle')
            },
            {
                path: 'seasinger/:keywords',
                component: () =>
                    import ('@/components/header/SeaSinger')
            },
            {
                path: 'seaablum/:keywords',
                component: () =>
                    import ('@/components/header/SeaAlbum')
            },
            {
                path: 'seavideo/:keywords',
                component: () =>
                    import ('@/components/header/SeaVideo')
            },
        ],
    },
    {
        path: '/vmdetail/:id',
        component: () =>
            import ('@/components/middle/video/VMDetail')
    },
    {
        path: '/artist:id',
        component: () =>
            import ('@/components/artist/Artist'),
        children: [{
            path: '/mv',
            component: () =>
                import ('@/components/artist/MV')
        }, ]
    },
]

const router = new VueRouter({
    mode: 'history',
    routes
});

export default router