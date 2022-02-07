import axios from 'axios';
import User, { UserIntro } from '@/models/user';
import ApiUtils from '@/api/api-utils';

const UserAboutApi = {
  async getUserIntro(user: User | undefined): Promise<UserIntro> {
    return (await axios.get<UserIntro>(`/users/${user?.discordId}/about/intro`)).data;
  },
  async updateUserIntro(authToken: string, user: User, intro: UserIntro): Promise<boolean> {
    try {
      await axios.put(`/users/${user.discordId}/about/intro`, intro, ApiUtils.authTokenHeader(authToken));
      return true;
    } catch (e) {
      return false;
    }
  },
};

export default UserAboutApi;
