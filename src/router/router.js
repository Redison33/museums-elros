import VueRouter from 'vue-router';
import Create from '../pages/Create.vue';
import Home from '../pages/Home.vue';
export default new VueRouter({
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/create',
      component: Create,
    },
  ],
});
