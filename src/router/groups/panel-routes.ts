import { RouteConfig } from 'vue-router';
import ManagingHome from '@/views/managing/ManagingHome.vue';
import Managing from '@/views/managing/Managing.vue';
import ManagingTags from '@/views/managing/ManagingTags.vue';
import Admin from '@/views/admin/Admin.vue';
import AdminHome from '@/views/admin/AdminHome.vue';

const panelRoutes: RouteConfig[] = [
  {
    path: '/manage',
    component: Managing,
    children: [
      {
        path: '',
        name: 'Panel de gestion',
        component: ManagingHome,
        meta: {
          icon: 'mdi-view-dashboard',
        },
      },
      {
        path: 'tags',
        name: 'Gestion des tags',
        component: ManagingTags,
        meta: {
          icon: 'mdi-tag-multiple',
        },
      },
    ],
  },
  {
    path: '/admin',
    component: Admin,
    children: [
      {
        path: '',
        name: 'Panel d\'administration',
        component: AdminHome,
        meta: {
          icon: 'mdi-view-dashboard',
        },
      },
    ],
  },
];
export default panelRoutes;
