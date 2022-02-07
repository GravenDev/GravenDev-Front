import Vue from 'vue';
import axios from 'axios';
import VClickOutside from 'v-click-outside';
import VueCustomTooltip from '@adamdehaven/vue-custom-tooltip';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(VClickOutside);
Vue.use(VueCustomTooltip, {
  name: 'VueCustomTooltip',
  color: '#fff',
  background: '#322f2c',
  borderRadius: '12',
  fontWeight: '600',
  padding: '12',
});

axios.defaults.baseURL = 'https://idea-u-b-preview.ftmnet.com/v1';

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
