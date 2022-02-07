import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import appRoutes from '@/router/groups/app-routes';
import redirectRoutes from '@/router/groups/redirect-routes';
import loginRoutes from '@/router/groups/login-routes';
import userRoutes from '@/router/groups/user-routes';
import panelRoutes from '@/router/groups/panel-routes';

Vue.use(VueRouter);

function hide(a: RouteConfig) {
  // eslint-disable-next-line no-param-reassign
  if (!a.meta) a.meta = {};
  // eslint-disable-next-line no-param-reassign
  if (a.meta.hidden !== false) a.meta.hidden = true;

  a.children?.forEach(hide);

  return a;
}

const routes: RouteConfig[] = [
  ...appRoutes,
  {
    redirect: '/',
    path: '/divider1',
    name: 'Divider1',
  },
  ...redirectRoutes,
  {
    redirect: '/',
    path: '/divider2',
    name: 'Divider2',
  },
  ...userRoutes.map(hide),
  ...loginRoutes.map(hide),
  ...panelRoutes.map(hide),
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.afterEach(async (to) => {
  document.title = `GravenDev - ${to.name}`;

  if (router.app.$store) {
    await router.app.$store.dispatch('router/autoLinksFill', [router, to]);
  }
});

export default router;
