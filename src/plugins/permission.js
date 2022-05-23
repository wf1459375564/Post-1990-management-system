import router from "@/router";
import NProgress from "nprogress";
import {
    Message
} from "element-ui";
import "nprogress/nprogress.css";

const whiteList = ["/login", "/404", "/401"]; //不验证登录||登录就不再直接跳转

router.beforeEach(async (to, from, next) => { //路由前置守卫
    NProgress.start();
    const Token = ''; //判断是否有Token
    if (Token) { //判断是否有Token
        if (whiteList.indexOf(to.path) !== -1) { //是否要进入登录、404、401页面
            next(false); //回到之前的路由信息
        } else { //如果是其他路径先这样处理
            if (0) { // 某些页面的时候要进行权限判断

            } else {
                next()
            }
        }
    } else { //如果没有
        console.log(to.path)
        if (whiteList.indexOf(to.path) !== -1) { //是否要进入这几个页面
            next()
        } else { //否则就进入登录界面
            next(`/login?redirect=${to.fullPath}`)
            Message.error('请重新登录');
            NProgress.done();
        }

    }

})

router.afterEach(() => {
    NProgress.done();
});