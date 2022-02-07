/* eslint-disable semi */
import User from '@/models/user';

export default interface PendingTag {
  id: number;
  name: string;
  icon?: string;
  user: User;
}
