import Vue from 'vue';
import Vuex from 'vuex';
import common from './modules/common';
import login from './modules/login';
import signup from './modules/signup';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        common,
        login,
        signup
    }
});
