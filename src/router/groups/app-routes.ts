import { RouteConfig } from 'vue-router';
import Rules from '@/views/Rules.vue';
import Home from '@/views/Home.vue';
import Events from '@/views/Events.vue';

const appRoutes: RouteConfig[] = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'Accueil',
    component: Home,
    meta: {
      icon: 'mdi-home',
    },
  },
  {
    path: '/rules',
    name: 'Règlement',
    component: Rules,
    meta: {
      icon: 'mdi-book-check',
    },
  },
  {
    path: '/events',
    name: 'Évènements',
    component: Events,
    meta: {
      icon: 'mdi-calendar',
    },
  },
];

export default appRoutes;
