// import Donvvui from 'donvv-ui';
// import 'donvv-ui/lib/donvvui.css';


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vue from 'vue';
import Donvvui from '../packages/index';
import App from './App.vue';
import router from './router/router.js';




Vue.use(Donvvui);
Vue.use(ElementUI);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');