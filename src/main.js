import Vue from 'vue';
import App from './App.vue';
import { createPinia, PiniaVuePlugin } from 'pinia';
import VueRouter from 'vue-router';
import router from './router/router';

Vue.use(VueRouter);
Vue.use(PiniaVuePlugin);
const pinia = createPinia();

new Vue({
  el: '#app',
  render: (h) => h(App),
  router,
  pinia,
});

// createApp(App).mount('#app');
