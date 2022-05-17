import Vue from '@vue';
import APP from '@/APP.vue';
import router from  './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from './axios/index';
import message from './hint';

Vue.use(ElementUI);
Vue.prototype.axios = axios;
var a = new Vue({
    el: '#root',
    template : '<APP></APP>',
    components : {APP},
    router
});
Vue.prototype.message = (...value)=>message.call(a,...value);
