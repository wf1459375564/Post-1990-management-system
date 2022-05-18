import Vue from '@vue';
import APP from '@/APP.vue';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from './axios/index';
import '@/plugins/permission.js'
import '@/tool'

Vue.use(ElementUI); //引入ElementUI
Vue.prototype.axios = axios;
var a = new Vue({
    el: '#root',
    template: '<APP></APP>',
    components: {
        APP
    },
    router
});