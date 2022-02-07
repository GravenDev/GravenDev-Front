import {
  ActionTree, GetterTree, Module, MutationTree,
} from 'vuex';
import User from '@/models/user';
import UserApi from '@/api/user-api';

type UserState = {
  loggedIn: boolean,
  currentUser: User | undefined | null
}

const xState: UserState = {
  loggedIn: false,
  currentUser: undefined,
};

const xGetters: GetterTree<UserState, unknown> = {
  isLoggedIn: ({ loggedIn }) => loggedIn,
  getCurrentUser({ currentUser }): User | undefined | null {
    return currentUser;
  },
};

const xMutations: MutationTree<UserState> = {
  setLoggedIn(state, loggedIn: boolean) {
    state.loggedIn = loggedIn;
  },
  setCurrentUser(state, currentUser: User) {
    state.currentUser = currentUser;
  },
};

const xActions: ActionTree<UserState, unknown> = {
  async fetchLoggedInUser({ commit }) {
    const loggedIn = await UserApi.isLoggedIn(localStorage.getItem('authToken') ?? '');
    commit('setLoggedIn', loggedIn.loggedIn);
    if (loggedIn) {
      commit('setCurrentUser', loggedIn.user);
    } else {
      commit('setCurrentUser', null);
    }
  },
};

const userModule: Module<UserState, unknown> = {
  state: xState,
  getters: xGetters,
  mutations: xMutations,
  actions: xActions,
  namespaced: true,
};

export default userModule;
