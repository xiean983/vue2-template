import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/', 
            redirect: { name: 'pageA' },
        },
        {
            name: 'pageA',
            path: '/pageA', 
            component: () => import('@/pages/pageA.vue'), 
            children: [
                {
                    name: 'pageB',
                    path: 'pageB', 
                    component: () => import('@/pages/pageB.vue')
                },
                {
                    name: 'pageC',
                    path: 'pageC', 
                    component: () => import('@/pages/pageC.vue')
                }
            ]
        },
        {
            name: 'pageD',
            path: '/pageD', 
            component: () => import('@/pages/pageD.vue')
        },
        {
            name: 'echart',
            path: '/echart', 
            component: () => import('@/pages/Echart.vue')
        }
    ]
})
