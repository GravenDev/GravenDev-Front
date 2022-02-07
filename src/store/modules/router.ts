import {
  ActionTree, GetterTree, Module, MutationTree,
} from 'vuex';
import VueRouter, { Route, RouteRecordPublic } from 'vue-router';

type RouterState = {
  links: RouteRecordPublic[];
  accentColor: string;
}

const xState: RouterState = {
  links: [],
  accentColor: '#FFFFFF',
};

const xGetters: GetterTree<RouterState, unknown> = {
  getLinks: ({ links }) => links,
  getAccentLinkColor: ({ accentColor }) => accentColor,
};

const xMutations: MutationTree<RouterState> = {
  setLinks(state, links: RouteRecordPublic[]) {
    state.links = links;
  },
  setAccentLinkColor(state, color: string) {
    state.accentColor = color;
  },
};

const xActions: ActionTree<RouterState, unknown> = {
  async autoLinksFill({ commit }, [router, route]: [VueRouter, Route]) {
    if (route.fullPath.includes('/manage')) {
      commit('setLinks',
        router.getRoutes()
          .filter((a) => !!a && !!a.path && !!a.name)
          .filter((a) => a.path.includes('/manage') || a.path.includes('/home')));
      commit('setAccentLinkColor', 'var(--blue)');
    } else if (route.fullPath.includes('/admin')) {
      commit('setLinks',
        router.getRoutes()
          .filter((a) => !!a && !!a.path && !!a.name)
          .filter((a) => a.path.includes('/admin') || a.path.includes('/home')));
      commit('setAccentLinkColor', 'var(--red)');
    } else {
      commit('setLinks',
        router.getRoutes()
          .filter((a) => !a.meta.hidden)
          .filter((a) => !!a && !!a.path && !!a.name));
      commit('setAccentLinkColor', 'var(--bg-primary)');
    }
  },
};

const routerModule: Module<RouterState, unknown> = {
  state: xState,
  getters: xGetters,
  mutations: xMutations,
  actions: xActions,
  namespaced: true,
};

export default routerModule;
