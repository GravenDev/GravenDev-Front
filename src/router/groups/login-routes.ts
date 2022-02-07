import { RouteConfig } from 'vue-router';
import Login from '@/views/login/Login.vue';
import LoginCallback from '@/views/login/LoginCallback.vue';
import Logout from '@/views/login/Logout.vue';

const loginRoutes: RouteConfig[] = [
  {
    path: '/login',
    name: 'Connexion',
    component: Login,
  },
  {
    path: '/login/callback',
    name: 'Login Callback',
    component: LoginCallback,
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout,
  },
];

export default loginRoutes;
