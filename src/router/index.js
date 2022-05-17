import Vue from '@vue';//首先要引入Vue
import Router from 'vue-router';//引入路由器
import {route} from './route';//引入路由器
// import router from './route';
Vue.use(Router);//注册路由器；
let {Login} = route;

const routes = [
    {//这是根目录 目前主动转入到登录页面
        path: '/',
        component: Login,
    },
    // {//这是个人中心页面
    //     path: '/user',
    //     component: Login,
    // }
];

export default new Router({
    routes,//到处去
})

