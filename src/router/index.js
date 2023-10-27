import { createRouter, createWebHistory } from 'vue-router'

import store from '../store'

const routes = [{
    path: '/register',
    name: 'register',
    component: () =>
        import( /* webpackChunkName: "register" */ '../views/auth/Register.vue'),
    meta: {
        hideForAuth: true
    }
},
{
    path: '/login',
    name: 'login',
    component: () =>
        import( /* webpackChunkName: "login" */ '../views/auth/login1.vue'),
    meta: {
        hideForAuth: true
    }
},
{
    path: '/customer/dashboard',
    name: 'dashboard',
    component: () =>
        import( /* webpackChunkName: "dashboard" */ '../views/dashboard/Index.vue'),
    meta: {
        requiresAuth: true
    }
},
{
    path: '/customer/order',
    name: 'order',
    component: () =>
        import( /* webpackChunkName: "order" */ '../views/order/Index.vue'),
    meta: {
        requiresAuth: true
    }
},
{
    path: '/customer/order/:snap_token',
    name: 'detail_order',
    component: () =>
        import( /* webpackChunkName: "detail_order" */ '../views/order/Show.vue'),
    meta: {
        requiresAuth: true
    }
},
{
    path: '/',
    name: 'home',
    component: () =>
        import( /* webpackChunkName: "home" */ '../views/home/Index.vue')
},
// {
//     path: '/:token',
//     name: 'home1',
//     component: () =>
//         import( /* webpackChunkName: "home" */ '../views/home/Index.vue')
// },
{
    path: '/product/:slug',
    name: 'detail_product',
    component: () =>
        import( /* webpackChunkName: "detail_product" */ '../views/product/Show.vue')
},
{
    path: '/categories',
    name: 'categories',
    component: () =>
        import( /* webpackChunkName: "category" */ '../views/category/Index.vue')
},
{
    path: '/category/:id',
    name: 'detail_category',
    component: () =>
        import( /* webpackChunkName: "detail_category" */ '../views/product/Show.vue')
},
{
    path: '/category',
    name: 'detail_category',
    component: () =>
        import( /* webpackChunkName: "detail_category" */ '../views/product/Show.vue')
},
{
    path: '/loading/:name/:cate',
    name: 'loading',
    component: () =>
        import( /* webpackChunkName: "detail_category" */ '../views/product/Loading.vue')
},
{
    path: '/loading/:cate',
    name: 'loading',
    component: () =>
        import( /* webpackChunkName: "detail_category" */ '../views/product/Loading.vue')
},
{
    path: '/cart',
    name: 'cart',
    component: () =>
        import( /* webpackChunkName: "cart" */ '../views/cart/Index.vue'),
    // meta: {
    //     requiresAuth: true
    // }
},
{
    path: '/Product/:name',
    name: 'DetailProduct',
    component: () =>
        import( /* webpackChunkName: "DetailProduct" */ '../views/home/DetailProduct.vue'),
},

{
    path: '/Product',
    name: 'DetailProduct',
    component: () =>
        import( /* webpackChunkName: "DetailProduct" */ '../views/home/DetailProduct.vue'),
},
{
    path: '/Brand/:name',
    name: 'DetailBrand',
    component: () =>
        import( /* webpackChunkName: "DetailBrand" */ '../views/home/DetailBrand.vue'),
},
{
    path: '/Brand',
    name: 'DetailBrand',
    component: () =>
        import( /* webpackChunkName: "DetailBrand" */ '../views/home/DetailBrand.vue'),
},
// {
//     path: '/crepro',
//     name: 'crepro',
//     component: () =>
//         import( /* webpackChunkName: "CrePro" */ '../views/home/CreatePro.vue'),
//         // meta: {
//         //     requiresAuth: true
//         // }
// },
{
    path: '/CreateBra',
    name: 'CreateBra',
    component: () =>
        import( /* webpackChunkName: "CrePro" */ '../views/home/CreateBra.vue'),
        // meta: {
        //     requiresAuth: true
        // }
},
{
    path: '/CreateAdm',
    name: 'CreateAdm',
    component: () =>
        import( /* webpackChunkName: "CrePro" */ '../views/auth/CreateAdm.vue'),
        // meta: {
        //     requiresAuth: true
        // }
},
{
    path: '/ChangePass',
    name: 'ChangePass',
    component: () =>
        import( /* webpackChunkName: "CrePro" */ '../views/auth/ChangePass.vue'),
        // meta: {
        //     requiresAuth: true
        // }
},
{
    path: '/ChangeEm',
    name: 'ChangeEm',
    component: () =>
        import( /* webpackChunkName: "CrePro" */ '../views/auth/ChangeEm.vue'),
        // meta: {
        //     requiresAuth: true
        // }
},
{
    path: '/UpdBrand',
    name: 'UpdBrand',
    component: () =>
        import( /* webpackChunkName: "UpdBra" */ '../views/home/UpdBrand.vue'),
        // meta: {
        //     requiresAuth: true
        // }
}

]

const router = createRouter({
    history: createWebHistory(),
    routes
})


router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters['auth/isLoggedIn']) {
            next()
            return
        }
        next('/login')
    } else if (to.matched.some(record => record.meta.hideForAuth)) {
        if (!store.getters['auth/isLoggedIn']) {
            next()
            return
        }
        next('/')
    } else {
        next()
    }
})

export default router