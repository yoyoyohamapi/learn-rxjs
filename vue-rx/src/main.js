import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import VueRouter from 'vue-router';
import VueRx from 'vue-rx';
import Rx from 'rxjs/Rx';
import App from './App.vue';
import Login from './components/Login.vue';
import Signup from './components/Signup.vue';

import store from './store';

Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(VueRx, Rx);

const routes = [{
    path: '/login',
    component: Login
}, {
    path: '/signup',
    component: Signup
}, { path: '/', redirect: '/login' }];

const router = new VueRouter({
    routes
});

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
