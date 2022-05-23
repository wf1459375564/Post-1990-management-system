import Vue from '@vue'; //首先要引入Vue
import Router from 'vue-router'; //引入路由器
import {
    route
} from './route'; //引入路由器
// import router from './route';
Vue.use(Router); //注册路由器；
let {
    Login
} = route;

const routes = [{
        path: '/',
        component: Login,
        redirect: '/dashboard',
        children: [{
            path: '/dashboard',
            name: 'Dashboard',
            component: Login,
            meta: {
                title: '首页',
                icon: 'el-icon-s-home'
            }
        }]
    },
    { //登录页面
        path: '/login',
        component: Login,
    },
    { //404
        path: '/404',
        name: '404',
        component: Login,
    },
    { //401
        path: '/401',
        component: Login,
    },

    { //如果没有匹配到路径就直接404
        path: '*',
        redirect: '/404'
    }
];

export default new Router({
    routes, //到处去
})