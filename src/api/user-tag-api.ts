import axios from 'axios';
import Tag, { TagSuggestion } from '@/models/tag';
import User from '@/models/user';
import ApiUtils from '@/api/api-utils';
import PendingTag from '@/models/pending-tag';

const UserTagApi = {
  async getAllTags(): Promise<Tag[]> {
    return (await axios.get<Tag[]>('/users/tags')).data;
  },
  async save(authToken: string, user: User, selectedTags: number[]): Promise<boolean> {
    try {
      await axios.put(`/users/${user.discordId}/tags`, selectedTags, ApiUtils.authTokenHeader(authToken));
      return true;
    } catch (e) {
      return false;
    }
  },
  async addTag(authToken: string, user: User, tag: Tag): Promise<boolean> {
    try {
      await axios.put(`/users/${user.discordId}/tags/${tag.id}`, {}, ApiUtils.authTokenHeader(authToken));
      return true;
    } catch (e) {
      return false;
    }
  },
  async removeTag(authToken: string, user: User, tag: Tag): Promise<boolean> {
    try {
      await axios.delete(`/users/${user.discordId}/tags/${tag.id}`, ApiUtils.authTokenHeader(authToken));
      return true;
    } catch (e) {
      return false;
    }
  },
  async getTagsOf(user: User): Promise<Tag[]> {
    try {
      const tags = await axios.get<Tag[]>(`/users/${user.discordId}/tags`);
      return tags.data;
    } catch (e) {
      return [];
    }
  },
  async addSuggestion(authToken: string, tag: TagSuggestion): Promise<boolean> {
    try {
      await axios.post('/users/tags/suggestions', tag, ApiUtils.authTokenHeader(authToken));
      return true;
    } catch (e) {
      return false;
    }
  },
  async getSuggestions(authToken: string): Promise<PendingTag[]> {
    try {
      return (await axios.get<PendingTag[]>(
        '/users/tags/suggestions',
        ApiUtils.authTokenHeader(authToken),
      )).data;
    } catch (e) {
      return [];
    }
  },
  async getSuggestionsCount(authToken: string): Promise<number> {
    try {
      return (await axios.get<number>(
        '/users/tags/suggestions/count',
        ApiUtils.authTokenHeader(authToken),
      )).data;
    } catch (e) {
      return 0;
    }
  },
};

export default UserTagApi;
