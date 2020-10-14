import Vue from 'vue';
import Router from 'vue-router';
import Comments from "./views/Comments";
import Login from "./views/Login";
import Register from "./views/Register";

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      components: Comments
    },
    {
      path: '/login',
      components: Login
    },
    {
      path: '/register',
      components: Register
    }
  ]
});