import { RouteConfig } from 'vue-router';

const redirectRoutes: RouteConfig[] = [
  {
    name: 'Serveur Discord',
    path: '/discord',
    beforeEnter(): void {
      window.open('https://discord.gg/graven');
    },
    meta: {
      icon: 'mdi-discord',
    },
  },
  {
    name: 'Chaine YouTube',
    path: '/youtube',
    beforeEnter(): void {
      window.open('https://youtube.com/c/GravenilvecTuto');
    },
    meta: {
      icon: 'mdi-youtube',
    },
  },
];

export default redirectRoutes;
