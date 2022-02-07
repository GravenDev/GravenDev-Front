import {
  ActionTree, GetterTree, Module, MutationTree,
} from 'vuex';
import TokenApi from '@/api/token-api';

type AppState = {
  desktop: boolean,
  authToken: string,
  drawer: boolean,
  loading: boolean,
}

const xState: AppState = {
  desktop: true,
  authToken: localStorage.getItem('authToken') ?? '',
  drawer: false,
  loading: true,
};

const xGetters: GetterTree<AppState, any> = {
  isOnDesktop: ({ desktop }) => desktop,
  getAuthToken: ({ authToken }) => authToken,
  isDrawerOpened: ({ drawer }) => drawer,
  isLoading: ({ loading }) => loading,
};

const xMutations: MutationTree<AppState> = {
  setOnDesktop(state, desktop: boolean) {
    state.desktop = desktop;
  },
  setAuthToken(state, authToken: string) {
    state.authToken = authToken;
    localStorage.setItem('authToken', authToken);
  },
  setDrawerOpened(state, drawer: boolean) {
    state.drawer = drawer;
  },
  setLoading(state, loading: boolean) {
    state.loading = loading;
  },
};

const xActions: ActionTree<AppState, any> = {
  async createAuthToken({ commit }) {
    const authToken = await TokenApi.createToken();
    commit('setAuthToken', authToken.authToken);
  },
  async validateAuthToken({
    dispatch,
    commit,
    state,
  }) {
    if (!state.authToken) {
      dispatch('createAuthToken');
      return;
    }
    const authToken = await TokenApi.validateToken(state.authToken);
    commit('setAuthToken', authToken.authToken);
  },
  async updateOnDesktop({ commit }) {
    commit('setOnDesktop', (window.innerWidth ?? 0) >= 960);
  },
  async switchDrawerState(x) {
    x.commit('setDrawerOpened', !x.state.drawer);
  },
  async openDrawer({ commit }) {
    commit('setDrawerOpened', true);
  },
  async closeDrawer({ commit }) {
    commit('setDrawerOpened', false);
  },
  async loading({ commit }) {
    commit('setLoading', true);
  },
  async loaded({ commit }) {
    commit('setLoading', false);
  },
};

const appModule: Module<AppState, any> = {
  state: xState,
  getters: xGetters,
  mutations: xMutations,
  actions: xActions,
  namespaced: true,
};

export default appModule;
