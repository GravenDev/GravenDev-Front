import axios from 'axios';
import User from '@/models/user';
import Token from '@/models/token';

interface LoggedInReturn {
  loggedIn: boolean;
  user?: User;
}

type OptionalUser = User | undefined;

const UserApi = {
  async login(authToken: string, code: string): Promise<OptionalUser> {
    try {
      const user = await axios.post<User>('/login', {
        code,
      }, {
        headers: {
          Authorization: authToken,
        },
      });
      return user.data;
    } catch (e) {
      return undefined;
    }
  },
  async logout(authToken: string): Promise<string> {
    try {
      const token = await axios.post<Token>('/logout', {}, {
        headers: {
          Authorization: authToken,
        },
      });
      console.log(token.data.authToken);
      return token.data.authToken;
    } catch (e) {
      return authToken;
    }
  },
  async fetchCurrentUser(authToken: string): Promise<OptionalUser> {
    try {
      const user = await axios.get<User>('/users/me', {
        headers: {
          Authorization: authToken,
        },
      });
      return user.data;
    } catch (e) {
      return undefined;
    }
  },
  async isLoggedIn(authToken: string): Promise<LoggedInReturn> {
    try {
      const loggedIn = await axios.get('/login/status', {
        headers: {
          Authorization: authToken,
        },
      });
      const rt: LoggedInReturn = {
        loggedIn: loggedIn.data.loggedIn,
      };
      if (rt.loggedIn) {
        rt.user = loggedIn.data.user;
      }
      return rt;
    } catch (e) {
      return {
        loggedIn: false,
      };
    }
  },
  async getUserByDiscordId(discordId: string | number): Promise<OptionalUser> {
    try {
      const user = await axios.get(`/users/${discordId}`);
      return user.data;
    } catch (e) {
      return undefined;
    }
  },
  async getAllUsers(): Promise<User[]> {
    try {
      const users = await axios.get('/users');
      return users.data;
    } catch (e) {
      return [];
    }
  },
};

export default UserApi;
