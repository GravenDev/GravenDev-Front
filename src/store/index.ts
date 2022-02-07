import Vue from 'vue';
import Vuex from 'vuex';
import router from '@/store/modules/router';
import user from '@/store/modules/user';
import app from '@/store/modules/app';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    app,
    user,
    router,
  },
});

export default store;
