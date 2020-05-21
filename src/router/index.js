import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        component: () =>
            import ('@/views/about')
    },
    {
        path: '/login',
        name: 'Login',
        component: () =>
            import ('@/views/login')
    },
    {
        path: '/reg',
        name: 'Reg',
        component: () =>
            import ('@/views/reg')
    },
]

const router = new VueRouter({
    routes,
    mode: 'history',
    // linkActiveClass:''
})
router.beforeEach((to, from, next) => {
    let { fullPath } = to;
    if (!localStorage.getItem('token') && fullPath !== '/login') {
        next('/login')
    } else {
        next()
    }
})
export default router