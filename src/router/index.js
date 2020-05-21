import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home'
Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/login',
        name: 'login',
        component: () =>
            import ('@/views/login')
    },
    {
        path: '/regs',
        name: 'regs',
        component: () =>
            import ('@/views/reg')
    },
]
const router = new VueRouter({
    routes,
    mode: 'history',
})
router.beforeEach((to, from, next) => {
    let {
        fullPath
    } = to;
    if (!localStorage.getItem('token') && fullPath !== '/login') {
        next('/login')
    } else {
        next()
    }
})
export default router