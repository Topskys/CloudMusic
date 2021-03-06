const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    //暂时关闭代码检测 npm run lint
    lintOnSave: false,
    //解决跨域问题
    devServer: {
        proxy: {
            '/api': {
                // 此处的写法，目的是为了 将 /api 替换成 https://autumnfish.cn/
                target: 'https://autumnfish.cn/', //改用本地服务器连接nodejs
                // target: 'http://m.kugou.com/',
                // target: 'http://mobilecdnbj.kugou.com/v3',
                // 允许跨域
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }

})



// module.exports = {
//     configureWebpack:{
//         resolve:{
//             alias:{
//                 'assets':'@/assets',
//                 'common':'@/common',
//                 'components':'@/components',
//                 'network':'@/network',
//                 'views':'@/views',
//             }
//         }
//     },
//     devServer: {
//         proxy: {//解决跨域问题
//             '/api': {
//                 // 此处的写法，目的是为了 将 /api 替换成 https://autumnfish.cn/
//                 target: 'https://autumnfish.cn/',
//                 // target: 'http://m.kugou.com/',
//                 // target: 'http://mobilecdnbj.kugou.com/v3',
//                 // 允许跨域
//                 changeOrigin: true,
//                 ws: true,
//                 pathRewrite: {
//                     '^/api': ''
//                 }
//             }
//         }
//     }
// };