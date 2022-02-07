import { RouteConfig } from 'vue-router';
import User from '@/views/user/User.vue';
import UserEdit from '@/views/user/edit/UserEdit.vue';
import Users from '@/views/user/Users.vue';

const userRoutes: RouteConfig[] = [
  {
    path: '/users',
    name: 'Utilisateurs',
    component: Users,
    meta: {
      icon: 'mdi-account-group',
      hidden: false,
    },
  },
  {
    path: '/u/:discordId',
    name: 'User',
    component: User,
  },
  {
    path: '/u/:discordId/edit',
    name: 'UserEdit',
    component: UserEdit,
  },
];
export default userRoutes;
