/* eslint-disable semi */
import Tag from '@/models/tag';
import Role from '@/models/role';

export default interface User {
  email?: string;
  discordId: string;
  tag: string;
  nickname: string;
  avatarUrl: string | undefined;
  bannerUrl: string | undefined;
  accentColor: string;
  roles: Role[];
  tags: Tag[];
  intro?: string;
}

export interface UserIntro {
  text: string;
}
