import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import echarts from '@/components/common/echart';
import element from '@/components/common/element';

Vue.prototype.$echarts = echarts  // 调用的时候就是 ：  this.$echarts
Vue.use(element)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: (h) => {
        return h(App)
    }
}).$mount("#app")