import Vue from 'vue'
// import App from './App.vue'
import App from './views/resume.vue'
// import App from '@/components/middle/item/VideoItem'
// import App from '@/components/comment/Comment'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/flex.css'
import '@/assets/css/index.css'
import { request } from '@/util/api'



Vue.prototype.HOST = 'api'
Vue.prototype.$request = request

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')